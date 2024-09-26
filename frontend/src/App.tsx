import React, { useEffect, useState } from 'react';
import './App.scss';
import _ from 'lodash';
import { Header, Link } from './components/Header';
import { Hero } from './components/Hero';
import { Education, Experience, Projects } from './sections';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { DetailedCard } from './components/DetailedCard';
import { useDesktopMediaQuery, usePortraitMediaQuery } from './hooks/useMediaQuery/useMediaQuery';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import config from './config.json';
import { LoadingSpinner } from './components/LoadingSpinner';

const graphqlClient = new GraphQLClient({
  url: `${config.graphqlServer}${config.graphqlEndpoint}`,
  fetchOptions: {
    mode: 'cors'
  }
});

const links: Link[] = [
  {
    name: 'Projects',
    href: '#projects',
  },
  {
    name: 'Experience',
    href: '#experience',
  },
  {
    name: 'Education',
    href: '#education',
  },
];

export function prependGraphQlUrl(url: string) {
  return `${config.graphqlServer}${url}`;
}

function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

  const onPageReady = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, config.loaderMinDelay);
  };

  return (
    <>
      {isLoading && <LoadingSpinner /> }
      <div style={{ opacity: isLoading ? 0 : 1 }} className="App">
        <Header firstname={config.firstname} lastname={config.lastname} links={links} />
        <Hero
          title={config.hero.title}
          subtitle={config.hero.subtitle}
          arrowDownHref={config.hero.arrowDownHref}
          githubLink={config.hero.githubLink}
          linkedinLink={config.hero.linkedinLink}
          emailLink={config.hero.emailLink}
          onReady={onPageReady}
          />
        <Projects />
        <Experience />
        <Education />
        <div id="card" />
      </div>
    </>
  );
}

function DetailedCardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <DetailedCard {...location.state} onClose={() => navigate(-1)}/>
  );
}

function MediaQueryClassWrapper({ children }: Readonly<{ children: React.ReactNode}>) {
  const isDesktop = useDesktopMediaQuery();
  const isPortrait = usePortraitMediaQuery();
  
  return (
    <div className={`${isDesktop ? '' : 'mobile'} ${isPortrait ? '' : 'portrait'}`}>
      {children}
    </div>
  );
}

function wrapWithContext(children: React.ReactNode) {
  return (
    <ClientContext.Provider value={graphqlClient}>
      <MediaQueryClassWrapper>{children}</MediaQueryClassWrapper>
    </ClientContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={wrapWithContext(<HomePage />)} />
        <Route path="/detailedCard" element={wrapWithContext(<DetailedCardPage />)} />
      </Routes>
    </Router>
  );
}

export default App;
