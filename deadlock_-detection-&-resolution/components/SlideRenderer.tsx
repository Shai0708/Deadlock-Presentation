
import React, { useState } from 'react';
import { Slide } from '../types';
import { MEMBERS } from '../constants';
import RAGVisualizer from './RAGVisualizer';

interface Props {
  slide: Slide;
}

const SlideRenderer: React.FC<Props> = ({ slide }) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [simMode, setSimMode] = useState<'deadlock' | 'safe'>('deadlock');

  const getIcon = (iconName?: string, animate: boolean = false) => {
    const animationClass = animate ? 'animate-bounce' : '';
    switch(iconName) {
      case 'terminal': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>;
      case 'alert': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>;
      case 'key': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>;
      case 'chef': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a5 5 0 015 5v2a1 1 0 001 1h1a1 1 0 011 1v6a1 1 0 01-1 1H6a1 1 0 01-1-1v-6a1 1 0 011-1h1a1 1 0 001-1V7a5 5 0 015-5z M9 14h6 M9 17h6"/></svg>;
      case 'knife': return <span className="text-3xl">🔪</span>;
      case 'bread': return <span className="text-3xl">🍞</span>;
      case 'plate': return <span className="text-3xl">🍽️</span>;
      case 'logic': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>;
      case 'prevent': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>;
      case 'bank': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v20M12 14v20M16 14v20M3 10l9-7 9 7M4 10v11h16V10"/></svg>;
      case 'search': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;
      case 'book': return <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>;
      
      // Point Icons
      case 'lock': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>;
      case 'hand': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 013 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m-3-5.5a1.5 1.5 0 013 0v1"/></svg>;
      case 'shield': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>;
      case 'refresh': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>;
      case 'unlock': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>;
      case 'hand-release': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>;
      case 'shield-off': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>;
      case 'sort': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg>;
      case 'bundle': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>;
      case 'brain': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z"/></svg>;
      case 'check-circle': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
      case 'cross-circle': return <svg className={`w-6 h-6 ${animationClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
      case 'terminate': return <span className={`text-xl ${animationClass}`}>🛑</span>;
      case 'transfer': return <span className={`text-xl ${animationClass}`}>🔄</span>;
      case 'history': return <span className={`text-xl ${animationClass}`}>⏪</span>;
      default: return null;
    }
  };

  const BackgroundArt = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-60">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1.5px, transparent 1.5px)', backgroundSize: '64px 64px' }} />
    </div>
  );

  const HeaderIconBox = () => (
    <div className="flex items-center gap-5 mb-6 group animate-in slide-in-from-left duration-700">
      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white group-hover:rotate-6 transition-all shadow-lg shadow-blue-200">
        <div className="w-7 h-7">
           {getIcon(slide.headerIcon)}
        </div>
      </div>
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">{slide.title}</h2>
        {slide.subtitle && <p className="text-blue-600 font-bold uppercase text-[9px] tracking-[0.2em] mt-1 bg-blue-50 px-2.5 py-0.5 rounded-full w-fit">{slide.subtitle}</p>}
      </div>
    </div>
  );

  const renderTitle = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in duration-1000 relative w-full">
      <BackgroundArt />
      <div className="flex items-center gap-6 mb-2 relative scale-100">
        <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="w-20 h-20 bg-blue-600 rounded-[28px] rotate-12 flex items-center justify-center shadow-xl relative z-10 border-4 border-white transition-transform hover:rotate-0 duration-500">
          <span className="text-3xl font-black text-white">BU</span>
        </div>
      </div>
      <div className="space-y-3">
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter leading-[1] max-w-4xl drop-shadow-sm">
          {slide.title}
        </h1>
        <p className="text-xl text-slate-500 font-mono font-medium tracking-tight">
          {slide.subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-16 pt-12 border-t border-slate-200 w-full max-w-3xl">
        <div className="space-y-4">
          <h4 className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Developed By Group 1</h4>
          <ul className="grid grid-cols-1 gap-2 text-slate-700 font-bold text-sm">
            {MEMBERS.map(m => (
              <li key={m.name} className="flex items-center gap-2.5 group cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:w-3 transition-all" />
                {m.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Academic Context</h4>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
            <p className="text-slate-900 font-black text-lg">Sir Jerry B. Agsunod</p>
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Instructor | BU Polangui</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto py-6 animate-in slide-in-from-bottom-8 duration-700 relative">
      <BackgroundArt />
      <HeaderIconBox />
      
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {slide.content?.map((line, idx) => (
          <div key={idx} className="group flex items-start gap-6 bg-white p-8 rounded-[32px] border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
             <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm shrink-0">
               {idx+1}
             </div>
             <p className="text-2xl text-slate-800 leading-snug font-medium tracking-tight flex-1 py-1">
              {line}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInteractive = () => (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto py-4 relative">
      <BackgroundArt />
      <HeaderIconBox />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 items-stretch">
        <div className="flex flex-col justify-center gap-4">
          {slide.points?.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActivePoint(idx)}
              className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-500 flex items-center gap-6 group ${
                activePoint === idx 
                  ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-500/20 translate-x-2' 
                  : 'bg-white border-slate-50 hover:border-blue-300 shadow-md shadow-slate-200/50'
              }`}
            >
              <div className={`p-3 rounded-xl transition-all duration-500 ${activePoint === idx ? 'bg-white text-blue-600 shadow-inner' : 'bg-blue-50 text-blue-600 group-hover:scale-110'}`}>
                {getIcon(p.icon, activePoint === idx)}
              </div>
              <div className="overflow-hidden">
                <h3 className={`text-xl font-black tracking-tighter truncate ${activePoint === idx ? 'text-white' : 'text-slate-800'}`}>{p.label}</h3>
                <p className={`text-[8px] font-bold uppercase tracking-widest mt-0.5 transition-opacity ${activePoint === idx ? 'text-blue-100 opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100'}`}>See System Impact</p>
              </div>
            </button>
          ))}
        </div>
        
        <div className="relative">
          {activePoint !== null ? (
            <div className="h-full bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl flex flex-col justify-start overflow-hidden animate-in zoom-in duration-500">
               <div className="absolute -right-12 -top-12 text-[160px] text-slate-100 opacity-40 pointer-events-none transform rotate-12">
                  {getIcon(slide.points?.[activePoint].icon)}
               </div>
              <div className="bg-blue-600 w-20 h-20 rounded-[28px] flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-200 relative z-10 shrink-0">
                {getIcon(slide.points?.[activePoint].icon, true)}
              </div>
              <div className="relative z-10 overflow-y-auto pr-2">
                <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-none">
                  {slide.points?.[activePoint].label}
                </h3>
                <p className="text-xl text-blue-600 font-medium mb-6 leading-relaxed italic">"{slide.points?.[activePoint].description}"</p>
                
                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600 animate-in slide-in-from-left duration-700 shadow-inner">
                  <h4 className="text-blue-600 font-black text-[9px] uppercase tracking-[0.2em] mb-2">The Fatal Connection</h4>
                  <p className="text-xl text-slate-700 leading-relaxed font-semibold">
                    {slide.points?.[activePoint].deadlockImpact}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-[40px] bg-white/50 animate-pulse">
              <p className="text-xl font-black tracking-tight text-slate-400">Select a condition to analyze</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSimulation = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-12 py-6 max-w-6xl mx-auto items-center animate-in fade-in duration-1000 relative w-full">
      <BackgroundArt />
      <div className="space-y-6 flex flex-col justify-center h-full">
        <HeaderIconBox />
        <div className="space-y-4">
           {slide.content?.map((line, idx) => (
            <p key={idx} className="text-xl text-slate-700 leading-tight font-semibold tracking-tight">{line}</p>
          ))}
        </div>
        <div className="pt-8 flex gap-4">
          <button 
            onClick={() => setSimMode('deadlock')}
            className={`px-8 py-4 rounded-2xl font-black transition-all ${simMode === 'deadlock' ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 scale-105' : 'bg-white text-slate-400 border border-slate-100'}`}
          >
            Classic Cycle
          </button>
          <button 
            onClick={() => setSimMode('safe')}
            className={`px-8 py-4 rounded-2xl font-black transition-all ${simMode === 'safe' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 scale-105' : 'bg-white text-slate-400 border border-slate-100'}`}
          >
            Linear Ordering
          </button>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
           <p className="text-xs text-blue-800 font-bold uppercase tracking-wider mb-2">Simulation Rule:</p>
           <p className="text-sm text-blue-700">
             {simMode === 'safe' 
               ? "By requiring Chef P3 to acquire Knife(1) before Plate(3), we break the circular dependency. P3 will wait for the Knife to be free instead of holding the Plate and waiting indefinitely."
               : "In a non-ordered system, Chef P3 takes the Plate(3) and waits for the Knife(1), creating a perfect circle of dependency with P1 and P2."}
           </p>
        </div>
      </div>
      <div className={`flex items-center justify-center bg-white p-10 rounded-[48px] border ${simMode === 'safe' ? 'border-emerald-200 shadow-emerald-500/10' : 'border-slate-100 shadow-xl'} backdrop-blur-sm h-fit transition-all duration-700`}>
        <RAGVisualizer mode={simMode} step={3} />
      </div>
    </div>
  );

  const renderStrategy = () => (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto py-6 relative">
       <BackgroundArt />
       <HeaderIconBox />

      <div className="flex-1 flex flex-col justify-center mt-2">
        {slide.points ? (
           <div className={`grid gap-6 ${slide.points.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {slide.points.map((p, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-50 shadow-lg shadow-slate-200/40 hover:scale-[1.02] hover:border-blue-400 hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden group flex flex-col h-full">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform" />
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 bg-blue-600 rounded-xl text-white shadow shadow-blue-200">
                    {getIcon(p.icon)}
                  </div>
                  <div className="text-blue-600 font-black text-[10px] tracking-widest uppercase">Method {i+1}</div>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tighter relative z-10">{p.label}</h4>
                <p className="text-slate-600 text-lg font-medium leading-relaxed relative z-10 flex-1">{p.description}</p>
              </div>
            ))}
           </div>
        ) : (
          <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-xl max-w-3xl mx-auto space-y-8">
             {slide.content?.map((line, i) => (
               <div key={i} className="flex gap-6 group items-start">
                  <div className="w-1.5 h-12 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors shrink-0" />
                  <p className="text-2xl text-slate-800 font-semibold leading-relaxed py-0.5">
                    {line}
                  </p>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderConclusion = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-12 py-6 animate-in zoom-in duration-1000 relative w-full">
      <BackgroundArt />
       <div className="relative">
        <div className="absolute inset-0 blur-3xl bg-blue-200 opacity-20 scale-150" />
        <h2 className="text-8xl font-black text-slate-900 tracking-tighter relative z-10 drop-shadow-sm">Summary</h2>
        <div className="h-2 w-32 bg-blue-600 mx-auto rounded-full mt-4 shadow-lg shadow-blue-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {slide.content?.map((line, idx) => (
          <div key={idx} className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-300/20 group hover:scale-[1.05] hover:border-blue-400 transition-all duration-500 relative flex flex-col items-center">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-8 group-hover:rotate-[360deg] transition-transform duration-700 shadow-lg shadow-blue-200 shrink-0">
              {idx + 1}
            </div>
            <p className="text-xl text-slate-800 leading-relaxed font-bold tracking-tight">
              {line}
            </p>
          </div>
        ))}
      </div>
      <div className="pt-8 text-slate-400 font-mono text-[9px] tracking-[0.4em] uppercase flex items-center gap-4 font-bold">
        <div className="w-12 h-[1.5px] bg-slate-200" />
        OS | CS 114 | BU Polangui
        <div className="w-12 h-[1.5px] bg-slate-200" />
      </div>
    </div>
  );

  const renderVisual = () => (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto py-6 relative">
      <BackgroundArt />
      <HeaderIconBox />
      <div className="flex-1 flex items-center justify-center">
        {slide.visualId === 'rag-graph' && <RAGVisualizer mode="deadlock" step={slide.visualStep} />}
        {slide.visualId === 'rag-graph-safe' && <RAGVisualizer mode="safe" step={3} />}
        {slide.visualId === 'scenario-status' && <RAGVisualizer mode="scenario-status" />}
      </div>
    </div>
  );

  const renderSplit = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-12 py-6 max-w-6xl mx-auto items-center animate-in fade-in duration-1000 relative w-full">
      <BackgroundArt />
      <div className="space-y-8 flex flex-col justify-center h-full">
        <HeaderIconBox />
        <div className="space-y-4">
           {slide.content?.map((line, idx) => (
            <div key={idx} className="flex gap-5 group bg-white p-6 rounded-[24px] border border-slate-50 shadow-md shadow-slate-200/30 hover:border-blue-200 transition-all items-start">
              <div className="w-1.5 h-10 bg-slate-100 rounded-full group-hover:bg-blue-600 transition-colors shrink-0" />
              <p className="text-xl text-slate-700 leading-tight font-semibold tracking-tight py-0.5">{line}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl backdrop-blur-sm h-fit">
        {slide.visualId === 'rag-graph' && <RAGVisualizer mode="deadlock" step={slide.visualStep} />}
        {slide.visualId === 'rag-graph-safe' && <RAGVisualizer mode="safe" step={3} />}
        {slide.visualId === 'scenario-status' && <RAGVisualizer mode="scenario-status" />}
      </div>
    </div>
  );

  switch (slide.type) {
    case 'title': return renderTitle();
    case 'content': return renderContent();
    case 'interactive': return renderInteractive();
    case 'strategy': return renderStrategy();
    case 'visual': return renderVisual();
    case 'split': return renderSplit();
    case 'conclusion': return renderConclusion();
    case 'simulation': return renderSimulation();
    default: return renderContent();
  }
};

export default SlideRenderer;

