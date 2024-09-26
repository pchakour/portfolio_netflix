import React, { useCallback, useEffect, useRef } from 'react';
import './Header.scss';

export interface Link {
  name: string;
  href: string;
}

interface HeaderProps {
  firstname: string;
  lastname: string;
  links: Link[];
}

const HEADER_BACKGROUND_CLASS = 'hasBackground';

export function Header({ firstname, lastname, links }: Readonly<HeaderProps>) {
  const header = useRef<HTMLElement>(null);

  const toggleHeaderBackground = useCallback(() => {
    if (header.current) {
      if (window.scrollY === 0) {
        header.current.classList.remove(HEADER_BACKGROUND_CLASS);
      } else {
        header.current.classList.add(HEADER_BACKGROUND_CLASS);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleHeaderBackground);

    return () => {
      window.removeEventListener("scroll", toggleHeaderBackground);
    }
  }, [toggleHeaderBackground]);

  return (
    <header ref={header}>
      <nav>
          <div className="logo">{firstname} <span className="highlight">{lastname}</span></div>
          <ul>
            { links.map((link) => <li key={link.name}><a href={link.href}>{link.name}</a></li>)}
          </ul>
      </nav>
    </header>
  );
}