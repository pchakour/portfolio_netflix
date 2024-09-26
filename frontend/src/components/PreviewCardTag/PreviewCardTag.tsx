import React from 'react';
import './PreviewCardTag.scss';

interface PreviewCardTagProps {
  hasBorder?: boolean;
  children: React.ReactElement | string;
  title?: string;
}

export function PreviewCardTag({ children, title, hasBorder }: Readonly<PreviewCardTagProps>) {
  return (
    <div className={`preview-card-tag ${hasBorder ? 'hasBorder' : ''}`} title={title}>{children}</div>
  );
}