
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES } from './constants';
import SlideRenderer from './components/SlideRenderer';

const App: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevIdxRef = useRef(0);

  const nextSlide = useCallback(() => {
    if (currentIdx < SLIDES.length - 1) {
      setDirection('next');
      setCurrentIdx(currentIdx + 1);
    }
  }, [currentIdx]);

  const prevSlide = useCallback(() => {
    if (currentIdx > 0) {
      setDirection('prev');
      setCurrentIdx(currentIdx - 1);
    }
  }, [currentIdx]);

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

  const jumpToSlide = (idx: number) => {
    setDirection(idx > currentIdx ? 'next' : 'prev');
    setCurrentIdx(idx);
  };

  const progress = ((currentIdx + 1) / SLIDES.length) * 100;
  const transitionClass = direction === 'next' ? 'animate-in slide-in-right' : 'animate-in slide-in-left';

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
      {/* Top Header/Progress bar stays fixed */}
      <header className="fixed top-0 left-0 right-0 z-[60] flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 backdrop-blur-md bg-white/70 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-110 active:scale-95">
              BU
            </div>
            <span className="font-mono text-[10px] text-slate-500 font-bold tracking-tight hidden md:inline">
              CS 114: OS DEADLOCK DETECTION & RESOLUTION
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono font-bold text-slate-400">
              {String(currentIdx + 1).padStart(2, '0')} <span className="text-slate-200">/</span> {String(SLIDES.length).padStart(2, '0')}
            </span>
            <button 
              onClick={toggleFullscreen}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 active:bg-slate-200"
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
            className="h-full bg-blue-600 transition-all duration-700 ease-in-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Slide Container with Directional Transition */}
      <main className="flex-1 overflow-hidden relative pt-16 pb-24 flex items-center justify-center">
        <div 
          className={`h-full w-full px-8 md:px-12 flex items-center justify-center ${transitionClass}`}
          key={currentIdx}
        >
          <SlideRenderer slide={SLIDES[currentIdx]} />
        </div>
        
        {/* Navigation Arrows with enhanced hover effects */}
        <button 
          onClick={prevSlide}
          disabled={currentIdx === 0}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/90 border border-slate-200 text-slate-700 shadow-xl backdrop-blur-md transition-all hover:bg-blue-600 hover:text-white hover:-translate-x-1 active:scale-90 disabled:opacity-0 disabled:pointer-events-none group z-[50] hidden md:flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentIdx === SLIDES.length - 1}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/90 border border-slate-200 text-slate-700 shadow-xl backdrop-blur-md transition-all hover:bg-blue-600 hover:text-white hover:translate-x-1 active:scale-90 disabled:opacity-0 disabled:pointer-events-none group z-[50] hidden md:flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </main>

      {/* Navigation Footer dots with smooth transitions */}
      <footer className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-[60]">
        <div className="bg-white/90 backdrop-blur-xl rounded-full px-4 py-2 flex gap-2 pointer-events-auto border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out hover:scale-125 ${
                idx === currentIdx ? 'bg-blue-600 w-8 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;

