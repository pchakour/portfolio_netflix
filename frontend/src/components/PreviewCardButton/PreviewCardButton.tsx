import React from 'react';
import './PreviewCardButton.scss';
import githubLogo from '../../logos/github-mark-white.svg';

interface PreviewCardButtonProps {
  title?: string;
  icon: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function PreviewCardButton({ title, icon, onClick }: Readonly<PreviewCardButtonProps>) {
  return (
    <button className={`preview-card-button ${icon}`} title={title} onClick={onClick}>
      { icon === 'github' ?
        <img src={githubLogo} alt='' />
      :
        <span className="material-icons">{icon}</span>
      }
    </button>
  );
}