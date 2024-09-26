import './Carousel.scss';
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardProps } from "../Card";
import { SkeletonLoader } from '../SkeletonLoader';

const COEFF_ACCELERATION = 3;
const CARD_SKELETON_SIZE = 5;

interface CarouselProps {
  cards: CardProps[];
  padding?: number;
  isLoading?: boolean;
}

export function Carousel({ cards, padding, isLoading }: Readonly<CarouselProps>) {
  const [displayPrevButton, setDisplayPrevButton] = useState<boolean>(false); 
  const [displayNextButton, setDisplayNextButton] = useState<boolean>(false);
  const grid = useRef<HTMLDivElement>(null);
  const nextButton = useRef<HTMLDivElement>(null);
  const dragStarted = useRef<React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>>();

  const getCardWidth = () => {
    if (grid.current) {
      return grid.current.clientWidth / cards.length;
    }

    return 0;
  };

  const moveCards = (direction: 'forward' | 'back' | 'drag', delta?: number) => {
    if (grid.current) {
      const cardWidth = getCardWidth();
      const elementsCouldBeDisplayed = document.body.clientWidth / cardWidth;
      const carouselWidth = grid.current.clientWidth - (elementsCouldBeDisplayed * cardWidth);
      const maxRight = carouselWidth * -1 - (nextButton.current?.clientWidth ?? padding ?? 0 ) * 2;
      const gap = Math.ceil(elementsCouldBeDisplayed) * cardWidth;
    
      const currentLeft = grid.current.style.left ? parseInt(grid.current.style.left.replace('px', ''), 10) : 0;
      let newLeft = direction === 'forward' ? currentLeft - gap : currentLeft + gap; 
      if (direction === 'drag' && delta !== undefined) {
        newLeft = currentLeft + delta;
      }

      if (newLeft > 0) {
        newLeft = 0;
      }

      if (newLeft < maxRight) {
        newLeft = maxRight;
      }

      grid.current.style.left = `${newLeft}px`;
    }
  };

  const displayControls = () => {
    if (dragStarted.current) {
      return;
    }

    if (grid.current) {
      const cardWidth = getCardWidth();
      const elementsCouldBeDisplayed = document.body.clientWidth / cardWidth;
      const maxRight = grid.current.clientWidth - (elementsCouldBeDisplayed * cardWidth);
      
      const currentLeft = grid.current.style.left ? parseInt(grid.current.style.left.replace('px', ''), 10) : 0;
      if (currentLeft < 0) {
        setDisplayPrevButton(true);
      }

      if (currentLeft >= maxRight * -1) {
        setDisplayNextButton(true);
      }
    }
  };

  const hideControls = () => {
    setDisplayNextButton(false);
    setDisplayPrevButton(false);
  };

  const startDrag = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    dragStarted.current = event;
  };
  
  const stopDrag = useCallback(() => {
    dragStarted.current = undefined;
  }, []);
  
  const drag = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (dragStarted.current && grid.current) {
      const timeToDrag = (event.timeStamp - dragStarted.current.timeStamp);
      const delta =
      // @ts-ignore
      (event.touches?.[0].clientX ?? event.clientX) - (dragStarted.current.touches?.[0].clientX ?? dragStarted.current.clientX);
      const acceleration = delta / timeToDrag;
      moveCards('drag', delta * Math.abs(acceleration * COEFF_ACCELERATION));
      dragStarted.current = event;
    }
  };

  useEffect(() => {
    document.body.addEventListener('touchend', stopDrag);
    document.body.addEventListener('touchcancel', stopDrag);

    return () => {
      document.body.removeEventListener('touchend', stopDrag);
      document.body.removeEventListener('touchcancel', stopDrag);
    };
  }, [stopDrag]);

  return (
    <div
      role="menu"
      tabIndex={0}
      className="carousel-container"
      onMouseOver={displayControls}
      onMouseOut={hideControls}
      onFocus={displayControls}
      onBlur={hideControls}
      onTouchStart={startDrag}
      onTouchMove={drag}
    >
      { displayPrevButton && 
        <div className="carousel-prev" onClick={() => moveCards('back')}>
          <span className="material-icons">arrow_back_ios</span>
        </div>
      }
      <div className='carousel' ref={grid}>
        { isLoading ? 
          [...Array(CARD_SKELETON_SIZE)].map((_v,i) => <SkeletonLoader key={i} height='170px' width='300px' />)
          :
           cards.map((card) => <Card key={card.title} {...card} /> )
        }
      </div>
      {displayNextButton && 
        <div ref={nextButton} className="carousel-next" onClick={() => moveCards('forward')}>
          <span className="material-icons">arrow_forward_ios</span>
        </div>
      }
    </div>
  );
}