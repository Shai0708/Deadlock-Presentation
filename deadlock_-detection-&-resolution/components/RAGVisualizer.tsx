
import React, { useEffect, useState } from 'react';

interface Props {
  mode: 'deadlock' | 'scenario-status' | 'safe' | 'solution-prevention' | 'solution-avoidance' | 'solution-recovery' | 'interactive-rag';
  step?: number;
}

const RAGVisualizer: React.FC<Props> = ({ mode, step = 4 }) => {
  const [avoidanceState, setAvoidanceState] = useState<'scanning' | 'denied'>('scanning');
  const [recoveryStep, setRecoveryStep] = useState(0);

  useEffect(() => {
    if (mode === 'solution-avoidance') {
      setAvoidanceState('scanning');
      const timer = setTimeout(() => setAvoidanceState('denied'), 2500);
      return () => clearTimeout(timer);
    }
    if (mode === 'solution-recovery') {
      setRecoveryStep(0);
      const timer1 = setTimeout(() => setRecoveryStep(1), 1000); // Selection
      const timer2 = setTimeout(() => setRecoveryStep(2), 2500); // Release
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [mode]);

  if (mode === 'scenario-status') {
    return (
      <div className="grid grid-cols-1 gap-4 w-full max-w-lg animate-in fade-in zoom-in duration-700">
        {[
          { chef: 'P1', has: 'Knife (K)', needs: 'Bread (B)', color: 'blue', icon: '🔪' },
          { chef: 'P2', has: 'Bread (B)', needs: 'Plate (P)', color: 'emerald', icon: '🍞' },
          { chef: 'P3', has: 'Plate (P)', needs: 'Knife (K)', color: 'purple', icon: '🍽️' },
        ].map((s, i) => (
          <div 
            key={s.chef} 
            className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 shadow-md"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                {s.icon}
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 tracking-tighter">Chef {s.chef}</h4>
                <div className="flex gap-4 text-[10px] font-mono mt-0.5 font-bold">
                  <span className="text-emerald-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Holds: {s.has}</span>
                  <span className="text-rose-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />Needs: {s.needs}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const isSafe = mode === 'safe' || mode === 'solution-prevention';
  const isRecovery = mode === 'solution-recovery';
  const isAvoidance = mode === 'solution-avoidance';
  const isDeadlockSteps = mode === 'deadlock';

  return (
    <div className={`relative w-full max-w-xl aspect-square bg-white rounded-[48px] border transition-all duration-700 ${
      isSafe ? 'border-emerald-200 bg-emerald-50/10' : 
      isAvoidance ? 'border-amber-200 bg-amber-50/10' : 
      isRecovery ? 'border-slate-200' : 
      'border-slate-200'
    } shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] p-10 overflow-hidden`}>
      
      <svg viewBox="0 0 500 500" className="w-full h-full">
        <defs>
          <marker id="arrowhead-hold" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" className="fill-emerald-600" />
          </marker>
          <marker id="arrowhead-req" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" className="fill-rose-600" />
          </marker>
          <marker id="arrowhead-blocked" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" className="fill-slate-300" />
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Resources */}
        <g className="animate-in fade-in duration-500">
          {/* Knife */}
          {(mode !== 'deadlock' || step >= 1) && (
            <g transform="translate(370, 170)" className="animate-in zoom-in duration-500">
              <rect width="80" height="80" rx="20" className="fill-slate-50 stroke-indigo-100 stroke-2" />
              <text x="40" y="65" textAnchor="middle" className="fill-indigo-900 font-black text-[9px] uppercase tracking-widest">{isSafe ? '1. Knife' : 'Knife'}</text>
              <text x="40" y="45" textAnchor="middle" className="text-2xl">🔪</text>
            </g>
          )}
          
          {/* Bread */}
          {(mode !== 'deadlock' || step >= 1) && (
            <g transform="translate(50, 170)" className="animate-in zoom-in duration-500">
              <rect width="80" height="80" rx="20" className="fill-slate-50 stroke-amber-100 stroke-2" />
              <text x="40" y="65" textAnchor="middle" className="fill-amber-900 font-black text-[9px] uppercase tracking-widest">{isSafe ? '2. Bread' : 'Bread'}</text>
              <text x="40" y="45" textAnchor="middle" className="text-2xl">🍞</text>
            </g>
          )}
          
          {/* Plate */}
          {(mode !== 'deadlock' || step >= 2) && (
            <g transform="translate(210, 360)" className="animate-in zoom-in duration-500">
              <rect width="80" height="80" rx="20" className="fill-slate-50 stroke-rose-100 stroke-2" />
              <text x="40" y="65" textAnchor="middle" className="fill-rose-900 font-black text-[9px] uppercase tracking-widest">{isSafe ? '3. Plate' : 'Plate'}</text>
              <text x="40" y="45" textAnchor="middle" className="text-2xl">🍽️</text>
            </g>
          )}
        </g>

        {/* Process P1 */}
        {(mode !== 'deadlock' || step >= 1) && (
          <g className="animate-in fade-in duration-500">
            <circle cx="250" cy="75" r="40" className="fill-blue-600 stroke-white stroke-[4px] shadow-lg" />
            <text x="250" y="82" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P1</text>
            <path d="M 370 210 Q 280 180 260 120" fill="none" className="stroke-emerald-600 stroke-[3px]" markerEnd="url(#arrowhead-hold)" />
            <path d="M 205 75 Q 110 85 95 165" fill="none" className="stroke-rose-600 stroke-2" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" />
          </g>
        )}

        {/* Process P2 */}
        {(mode !== 'deadlock' || step >= 2) && (
          <g className={`transition-all duration-700 animate-in fade-in ${isRecovery && recoveryStep >= 2 ? 'opacity-0 scale-50' : isRecovery && recoveryStep === 1 ? 'opacity-50' : ''}`}>
            <circle cx="85" cy="400" r="40" className={`${isRecovery && recoveryStep === 1 ? 'fill-rose-400 animate-pulse' : 'fill-emerald-600'} stroke-white stroke-[4px]`} />
            <text x="85" y="407" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P2</text>
            <path d="M 95 250 L 85 355" fill="none" className="stroke-emerald-600 stroke-[3px]" markerEnd="url(#arrowhead-hold)" />
            <path d="M 130 400 L 205 400" fill="none" className="stroke-rose-600 stroke-2" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" />
          </g>
        )}

        {/* Process P3 */}
        {(mode !== 'deadlock' || step >= 3) && (
          <g className="animate-in fade-in duration-500">
            <circle cx="415" cy="400" r="40" className="fill-purple-600 stroke-white stroke-[4px]" />
            <text x="415" y="407" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P3</text>
            <path d="M 295 400 L 370 400" fill="none" className="stroke-emerald-600 stroke-[3px]" markerEnd="url(#arrowhead-hold)" />
            
            {mode === 'solution-prevention' ? (
              <g>
                <path d="M 415 355 L 415 255" fill="none" className="stroke-slate-300 stroke-2" strokeDasharray="4,4" markerEnd="url(#arrowhead-blocked)" />
                <circle cx="415" cy="305" r="15" className="fill-white stroke-slate-200 stroke-2" />
                <text x="415" y="310" textAnchor="middle" className="fill-slate-400 font-black text-xs">ERR</text>
              </g>
            ) : (
              <path d="M 415 355 L 415 255" fill="none" className="stroke-rose-600 stroke-2" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" />
            )}
          </g>
        )}

        {/* Avoidance Scanner Overlay */}
        {isAvoidance && (
          <g>
            <circle cx="250" cy="250" r="200" fill="none" stroke="#fbbf24" strokeWidth="0.5" className="opacity-10" />
            {avoidanceState === 'scanning' && (
              <g className="animate-spin-slow origin-center" style={{ transformOrigin: '250px 250px' }}>
                <path d="M 250 250 L 250 50" stroke="#fbbf24" strokeWidth="4" className="opacity-40" filter="url(#glow)" />
                <path d="M 250 250 L 250 50" stroke="#fbbf24" strokeWidth="1" />
              </g>
            )}
          </g>
        )}

        {/* Recovery termination crosshair */}
        {isRecovery && recoveryStep === 1 && (
          <g transform="translate(85, 400)" className="animate-in zoom-in duration-300">
            <circle r="50" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="10,5" className="animate-spin-slow" />
            <line x1="-60" y1="0" x2="60" y2="0" stroke="#e11d48" strokeWidth="1" />
            <line x1="0" y1="-60" x2="0" y2="60" stroke="#e11d48" strokeWidth="1" />
          </g>
        )}
      </svg>
      
      {/* Labels / Hud */}
      <div className="absolute top-8 left-10 right-10 flex justify-between pointer-events-none">
        <div className="bg-slate-900/5 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-500">
          Visual Mode: {mode.replace('solution-', '').replace('-', ' ')}
        </div>
        {isDeadlockSteps && (
          <div className="bg-blue-600/10 backdrop-blur-md border border-blue-200 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-blue-600">
            Building Step: {step}
          </div>
        )}
      </div>

      {mode === 'solution-prevention' && (
        <div className="absolute inset-x-0 bottom-20 flex justify-center pointer-events-none">
          <div className="bg-emerald-600 text-white px-5 py-2.5 rounded-2xl font-black text-sm shadow-xl border-2 border-white animate-in slide-in-from-bottom duration-500">
            HIERARCHY VIOLATION: REQUEST BLOCKED
          </div>
        </div>
      )}

      {isAvoidance && (
        <div className="absolute inset-x-0 bottom-20 flex justify-center pointer-events-none">
          <div className={`px-5 py-2.5 rounded-2xl font-black text-sm shadow-xl border-2 border-white transition-all duration-500 ${avoidanceState === 'scanning' ? 'bg-amber-500 text-white' : 'bg-rose-600 text-white'}`}>
            {avoidanceState === 'scanning' ? 'BANKER: ANALYZING SAFETY SEQUENCE...' : 'UNSAFE STATE: REQUEST DENIED'}
          </div>
        </div>
      )}

      {isRecovery && (
        <div className="absolute inset-x-0 bottom-20 flex justify-center pointer-events-none">
          <div className={`px-5 py-2.5 rounded-2xl font-black text-sm shadow-xl border-2 border-white animate-in zoom-in ${recoveryStep === 2 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
            {recoveryStep === 0 ? 'SCANNING FOR CYCLES...' : recoveryStep === 1 ? 'TERMINATING VICTIM: P2' : 'CYCLE BROKEN - SYSTEM RECOVERED'}
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-0 right-0 px-10 flex justify-between text-[8px] font-mono tracking-widest uppercase text-slate-400 font-bold">
        <div className="flex items-center gap-2"><div className="w-2 h-1 bg-emerald-600 rounded-full"></div> Hold</div>
        <div className="flex items-center gap-2"><div className="w-2 h-0 border-t border-dashed border-rose-600"></div> Wait</div>
      </div>
    </div>
  );
};

export default RAGVisualizer;

