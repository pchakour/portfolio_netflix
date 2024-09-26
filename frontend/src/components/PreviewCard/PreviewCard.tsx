import React, { useEffect, useRef } from 'react';
import './PreviewCard.scss';
import { CardProps } from '../Card';
import { PreviewCardTag } from '../PreviewCardTag';
import { PreviewCardButton } from '../PreviewCardButton';
import { Video } from '../Video';

export interface PreviewCardProps extends CardProps {
  video?: string[];
  height: number;
  width: number;
  top: number;
  left: number;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void; 
  onMoreDetailsClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void; 
}

export function PreviewCard(props: Readonly<PreviewCardProps>) {
  const previewCardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setTimeout(() => {
      if (previewCardRef.current) {
        previewCardRef.current.style.minHeight = `${props.height + 200}px`;
        previewCardRef.current.style.width = `${props.width + 200}px`; 
        previewCardRef.current.style.opacity = '1';
        const realTop = props.top - 100 > 0 ? props.top : 0; 
        let realLeft = props.left - 100 > 100 ? props.left : 140;
        if (realLeft + props.width + 200 > document.body.clientWidth) {
          realLeft = document.body.clientWidth - props.width + 200 - 315; // TODO find the logic
        }
        previewCardRef.current.style.top = `${realTop}px`;
        previewCardRef.current.style.left = `${realLeft}px`;
      }
    }, 10);
  }, [props.height, props.width, props.top, props.left]);

  return (
    <div
      ref={previewCardRef}
      className="preview-card"
      onMouseLeave={props.onMouseLeave}
    >
      <div onClick={props.onMoreDetailsClick}>
        <Video video={props.video} image={props.image} />
      </div>
      <div className="preview-card-content">
        <div className="preview-card-title">
          {props.title}
        </div>
        <div className="preview-card-bar">
          <div className="preview-card-tags">
            {props.tags?.map((tag) => (
              <PreviewCardTag key={tag} hasBorder>
                {tag}
              </PreviewCardTag>
            ))}
          </div>
          <div className="preview-card-buttons">
            { props.gitRepository && 
              <PreviewCardButton icon="github" title="See the code" onClick={() => window.open(props.gitRepository)}/>
            }

            <PreviewCardButton icon="keyboard_arrow_down" title="More details" onClick={props.onMoreDetailsClick} />
          </div>
        </div>
      </div>
    </div>
  );
}