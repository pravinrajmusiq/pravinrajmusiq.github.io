import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { CustomCursor } from './components/ui/CustomCursor';
import { ThemeToggle } from './components/ui/ThemeToggle';
import HomePage from './pages/HomePage';
import VideosProject from './pages/projects/VideosProject';
import PosterProject from './pages/projects/PosterProject';
import MagazineProject from './pages/projects/MagazineProject';
import BoxDesignProject from './pages/projects/BoxDesignProject';

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      document.documentElement.classList.add('cursor-none');
    }
    return () => document.documentElement.classList.remove('cursor-none');
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL === './' ? '/Portupolio' : import.meta.env.BASE_URL}>
      <div className="bg-[var(--page-bg)] text-[var(--text-primary)]">
        <ThemeToggle />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/videos" element={<VideosProject />} />
          <Route path="/projects/poster" element={<PosterProject />} />
          <Route path="/projects/magazine" element={<MagazineProject />} />
          <Route path="/projects/box-design" element={<BoxDesignProject />} />
        </Routes>
        <div className="grain" aria-hidden="true" />
      </div>
    </BrowserRouter>
  );
}

export default App;
