import './Card.scss';
import _ from 'lodash';
import { createRoot } from 'react-dom/client';
import { PreviewCard } from '../PreviewCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DetailedCard } from '../DetailedCard';
import { useModal } from '../../hooks/useModal/useModal';
import { useNavigate } from 'react-router-dom';
import { useDesktopMediaQuery } from '../../hooks/useMediaQuery/useMediaQuery';
import { prependGraphQlUrl } from '../../App';
import { SkeletonLoader } from '../SkeletonLoader';

export interface CardProps {
  image: string;
  title: string;
  video?: string[];
  description: string;
  gitRepository?: string;
  technicalSkills?: string[];
  company?: string;
  school?: string;
  tags?: string[];
}

export function Card(props: Readonly<CardProps>) {
  const modal = useModal();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const displayTimeout = useRef<NodeJS.Timeout | null>(null);
  const mountedPreviewCard = useRef<ReturnType<typeof createRoot> | null>(null);
  const [detailedCardOpen, setDetailedCardOpen] = useState<boolean>(false);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const isDesktop = useDesktopMediaQuery();

  const openDetailedCard = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (isDesktop) {
      let unmount = _.noop;
  
      const closeModal = () => {
        unmount();
      };
      setDetailedCardOpen(true);
      const boundingBox = (event.target as HTMLButtonElement).parentElement?.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
      unmount = modal.open(
        <DetailedCard {...props} transformOrigin={(boundingBox?.left ?? 0)} onClose={closeModal} />,
        () => setDetailedCardOpen(false)
      );
    } else {
      navigate('/detailedCard', { state: props });
    }
  };

  const openPreviewCard = () => {
    if (isTouching || detailedCardOpen) {
      return;
    }

    const container = document.querySelector('#card');
    if (!container) {
      return;
    }
    
    const boundingBox = cardRef.current?.getBoundingClientRect();
    mountedPreviewCard.current = createRoot(container);
    mountedPreviewCard.current.render(
      <PreviewCard
        {...props}
        width={boundingBox?.width ?? 0}
        height={boundingBox?.height ?? 0}
        top={(boundingBox?.top ?? 0) + window.scrollY}
        left={(boundingBox?.left ?? 0) +  + window.scrollX}
        onMouseLeave={closePreviewCard}
        onMoreDetailsClick={openDetailedCard}
      />
    );
  };

  const delayOpenPreviewCard = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isDesktop) {
      if (displayTimeout.current) {
        clearTimeout(displayTimeout.current);
        displayTimeout.current = null;
      }

      displayTimeout.current = setTimeout(() => {
        displayTimeout.current = null;
        openPreviewCard();
      }, 500);
    }
  };

  const closePreviewCard = useCallback(() => {
    if (displayTimeout.current) {
      clearTimeout(displayTimeout.current);
      displayTimeout.current = null;
    }

    if (mountedPreviewCard.current) {
      mountedPreviewCard.current.unmount();
      mountedPreviewCard.current = null;
    }
  }, []);

  const preventOpenPreviewCard = useCallback(() => {
    if (displayTimeout.current) {
      closePreviewCard();
    }
  }, [closePreviewCard]);

  useEffect(() => {
    preventOpenPreviewCard();
  }, [preventOpenPreviewCard, isTouching, detailedCardOpen]);

  return (
    <div className='card-container'>
      <div
        className="card"
        onMouseEnter={delayOpenPreviewCard}
        onMouseLeave={preventOpenPreviewCard}
        onTouchStart={() => setIsTouching(true)}
        onTouchEnd={() => setIsTouching(false)}
        onTouchCancel={() => setIsTouching(false)}
        onClick={openDetailedCard}
        ref={cardRef}
      >
        { !imageLoaded && <SkeletonLoader width='300px' height='170px' />}
        <img
          style={{ opacity: imageLoaded ? 1 : 0 }}
          src={prependGraphQlUrl(props.image)}
          alt="Project"
          className="preview"
          onLoad={() => setImageLoaded(true)}
        />
        <div style={{ opacity: imageLoaded ? 1 : 0 }} className='title'>{props.title}</div>
      </div>
    </div>
  );
}