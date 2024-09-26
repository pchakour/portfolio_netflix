import React from 'react';
import { CardProps } from '../Card';
import { PreviewCardButton } from '../PreviewCardButton';
import { PreviewCardTag } from '../PreviewCardTag';
import { Video } from '../Video';
import './DetailedCard.scss';

interface DetailedCardProps extends CardProps {
  onClose: () => void;
  transformOrigin?: React.CSSProperties['transformOrigin'];
}

export function DetailedCard(props: Readonly<DetailedCardProps>) {
  return (
    <div
      className="detailed-card-content"
      style={{ transformOrigin: props.transformOrigin ? props.transformOrigin : '50%' }
    }>
      <div className='detailed-card-header'>
        <button className="detailed-card-close" onClick={props.onClose}><span className="material-icons">close</span></button>
        <Video video={props.video} image={props.image} controls />
      </div>
      <div className='detailed-card-body'>
        <div className='detailed-card-header-bottom'>
          <div className="detailed-card-header-title">
            {props.title}
          </div>
          <div className='detailed-card-header-bottom-button'>
            {props.gitRepository &&
              <PreviewCardButton icon='github' />
            }
          </div>
        </div>
        <div className='detailed-card-body-content'>
          <div className="detailed-card-body-left">
            {props.tags?.map((tag) => <PreviewCardTag key={tag} hasBorder>{tag}</PreviewCardTag>)}
            <div className='detailed-card-content-description'>
              {props.description}
            </div>
          </div>
          <div className='detailed-card-body-right'>
            <div><span>Technical skills:</span> {props.technicalSkills?.join(', ')}</div>
            { props.company && <div><span>Company:</span> {props.company}</div>}
            { props.school && <div><span>School:</span> {props.school}</div>}
          </div>
        </div>
      </div>
    </div >
  );
}