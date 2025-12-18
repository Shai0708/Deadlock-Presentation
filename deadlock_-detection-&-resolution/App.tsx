
import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import SlideRenderer from './components/SlideRenderer';

const App: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev < SLIDES.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'n' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'Backspace') {
        prevSlide();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const progress = ((currentIdx + 1) / SLIDES.length) * 100;

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      {/* Top Header/Progress */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 backdrop-blur-md bg-white/70 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-blue-500/30">
              BU
            </div>
            <span className="font-mono text-[10px] text-slate-500 font-bold tracking-tight hidden md:inline">
              CS 114: OS DEADLOCK DETECTION & RESOLUTION
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono font-bold text-slate-400">
              {String(currentIdx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
            <button 
              onClick={toggleFullscreen}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
              title="Toggle Fullscreen (F)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="h-[2px] w-full bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Slide Container - Bottom padding (pb-24) prevents content overlap with footer */}
      <main className="flex-1 overflow-hidden relative pt-16 pb-24">
        <div 
          className="h-full w-full px-8 md:px-12 flex items-center justify-center transition-opacity duration-300 ease-in-out"
          key={currentIdx}
        >
          <SlideRenderer slide={SLIDES[currentIdx]} />
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          disabled={currentIdx === 0}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/80 border border-slate-200 text-slate-700 shadow-xl backdrop-blur-sm transition-all hover:bg-blue-600 hover:text-white disabled:opacity-0 disabled:pointer-events-none group z-50 hidden md:flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentIdx === SLIDES.length - 1}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-white/80 border border-slate-200 text-slate-700 shadow-xl backdrop-blur-sm transition-all hover:bg-blue-600 hover:text-white disabled:opacity-0 disabled:pointer-events-none group z-50 hidden md:flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-50">
        <div className="bg-white/90 backdrop-blur-xl rounded-full px-4 py-2 flex gap-2 pointer-events-auto border border-slate-200 shadow-xl">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                idx === currentIdx ? 'bg-blue-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;
