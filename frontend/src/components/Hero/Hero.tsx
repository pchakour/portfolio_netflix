import React, { useEffect, useRef } from 'react';
import './Hero.scss';
import linkedinLogo from '../../logos/linkedin.png';
import githubLogo from '../../logos/github-mark-white.svg';
import heroBackground from './images/background.webp';

interface HeroProps {
  title: string;
  subtitle: string;
  arrowDownHref: string;
  githubLink: string;
  linkedinLink: string;
  emailLink: string;
  onReady?: () => void;
}

export function Hero({ title, subtitle, arrowDownHref, githubLink, linkedinLink, emailLink, onReady }: Readonly<HeroProps>) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.onload = function() {
      if (heroRef.current) {
        heroRef.current.style.backgroundImage = `url(${backgroundImage.src})`;
        if (onReady) {
          onReady();
        }
      }
    };
    backgroundImage.src = heroBackground;
  }, []);

  return (
    <div ref={heroRef} id="hero">
        <div className="hero-content">
            <div className='center'>
              <h1>{title}</h1>
              <p>{subtitle}</p>
              <div className='buttons'>
                <a href={githubLink} className='primary' target='blank'>
                  <span><img src={githubLogo} alt='' style={{ filter: 'invert(1)'}} width={20} /></span>
                  <span>Github</span>
                </a>
                <a href={linkedinLink} className='primary' target='blank'>
                  <span>
                    <img src={linkedinLogo} alt='' width={20}  />
                  </span>
                  <span>
                    Linkedin
                  </span>
                </a>
                <a href={emailLink} className='secondary'>
                  <span className="material-icons">mail_outline</span>
                  <span>Email</span>
                </a>
              </div>
            </div>
            <div className='bottom'>
              <a className='godown button' href={arrowDownHref}>
                <span className="material-icons">arrow_downward</span>
              </a>
            </div>
        </div>
    </div>
  );
}