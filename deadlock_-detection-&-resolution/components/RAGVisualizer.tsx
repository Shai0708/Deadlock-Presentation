
import React, { useEffect, useState } from 'react';

interface Props {
  mode: 'deadlock' | 'scenario-status' | 'safe' | 'solution-prevention' | 'solution-avoidance' | 'solution-recovery';
  step?: number;
}

const RAGVisualizer: React.FC<Props> = ({ mode, step = 4 }) => {
  const [avoidanceState, setAvoidanceState] = useState<'scanning' | 'denied'>('scanning');

  useEffect(() => {
    if (mode === 'solution-avoidance') {
      setAvoidanceState('scanning');
      const timer = setTimeout(() => setAvoidanceState('denied'), 2500);
      return () => clearTimeout(timer);
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
              <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm`}>
                {s.icon}
              </div>
              <div>
                <h4 className={`text-xl font-black text-slate-900 tracking-tighter`}>Chef {s.chef}</h4>
                <div className="flex gap-4 text-[10px] font-mono mt-0.5 font-bold">
                  <span className="text-emerald-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />Holds: {s.has}</span>
                  <span className="text-rose-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />Needs: {s.needs}</span>
                </div>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
               <div className="bg-rose-600 text-white px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white shadow shadow-rose-200 animate-pulse">
                Blocked
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

  return (
    <div className={`relative w-full max-w-xl aspect-square bg-white rounded-[48px] border ${isSafe ? 'border-emerald-200 shadow-emerald-500/5' : isAvoidance ? 'border-amber-200' : 'border-slate-200'} shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] p-10 overflow-hidden transition-all duration-700`}>
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
        </defs>

        {/* Resource Nodes */}
        <g className="animate-in fade-in duration-1000">
          <g transform="translate(370, 170)">
            <rect width="80" height="80" rx="20" className="fill-slate-50 stroke-indigo-100 stroke-2" />
            <text x="40" y="62" textAnchor="middle" className="fill-indigo-900 font-black text-[10px] uppercase tracking-wider">{isSafe ? '1. Knife' : 'Knife'}</text>
            <text x="40" y="42" textAnchor="middle" className="text-2xl">🔪</text>
          </g>
          
          <g transform="translate(50, 170)">
            <rect width="80" height="80" rx="20" className="fill-slate-50 stroke-amber-100 stroke-2" />
            <text x="40" y="62" textAnchor="middle" className="fill-amber-900 font-black text-[10px] uppercase tracking-wider">{isSafe ? '2. Bread' : 'Bread'}</text>
            <text x="40" y="42" textAnchor="middle" className="text-2xl">🍞</text>
          </g>
          
          <g transform="translate(210, 360)">
            <rect width="80" height="80" rx="20" className="fill-slate-50 stroke-rose-100 stroke-2" />
            <text x="40" y="62" textAnchor="middle" className="fill-rose-900 font-black text-[10px] uppercase tracking-wider">{isSafe ? '3. Plate' : 'Plate'}</text>
            <text x="40" y="42" textAnchor="middle" className="text-2xl">🍽️</text>
          </g>
        </g>

        {/* Process P1 */}
        <g>
          <circle cx="250" cy="75" r="40" className="fill-blue-600 stroke-white stroke-[4px] shadow-lg" />
          <text x="250" y="82" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P1</text>
          <path d="M 370 210 Q 280 180 260 120" fill="none" className="stroke-emerald-600 stroke-[3px]" markerEnd="url(#arrowhead-hold)" />
          <path d="M 205 75 Q 110 85 95 165" fill="none" className="stroke-rose-600 stroke-2" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" />
        </g>

        {/* Process P2 */}
        <g className={isRecovery ? 'opacity-30' : ''}>
          <circle cx="85" cy="400" r="40" className={`${isRecovery ? 'fill-slate-400' : 'fill-emerald-600'} stroke-white stroke-[4px]`} />
          <text x="85" y="407" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P2</text>
          {!isRecovery && (
            <path d="M 95 250 L 85 355" fill="none" className="stroke-emerald-600 stroke-[3px]" markerEnd="url(#arrowhead-hold)" />
          )}
          {!isRecovery && (
            <path d="M 130 400 L 205 400" fill="none" className="stroke-rose-600 stroke-2" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" />
          )}
        </g>

        {/* Process P3 */}
        <g>
          <circle cx="415" cy="400" r="40" className="fill-purple-600 stroke-white stroke-[4px]" />
          <text x="415" y="407" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P3</text>
          {isSafe ? (
            <path d="M 415 355 L 415 255" fill="none" className="stroke-rose-600 stroke-2" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" />
          ) : (
            <>
              <path d="M 295 400 L 370 400" fill="none" className="stroke-emerald-600 stroke-[3px]" markerEnd="url(#arrowhead-hold)" />
              <path d="M 415 355 L 415 255" fill="none" className="stroke-rose-600 stroke-2" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" />
            </>
          )}
        </g>

        {/* Avoidance Scanner */}
        {isAvoidance && (
          <g>
            <circle 
              cx="250" 
              cy="250" 
              r={avoidanceState === 'scanning' ? "180" : "0"} 
              fill="none" 
              stroke="#fbbf24" 
              strokeWidth="2" 
              className="animate-ping opacity-20"
            />
            {avoidanceState === 'scanning' && (
              <circle cx="250" cy="250" r="80" className="fill-amber-500/5 stroke-amber-500 stroke-2 stroke-dasharray-[10,5] animate-spin-slow" />
            )}
          </g>
        )}

        {/* Recovery Termination X */}
        {isRecovery && (
          <g transform="translate(85, 400)">
             <path d="M -25 -25 L 25 25 M 25 -25 L -25 25" className="stroke-rose-600 stroke-[10px] animate-in zoom-in" />
          </g>
        )}
      </svg>
      
      {/* Overlays */}
      {mode === 'solution-prevention' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
           <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black text-xl shadow-xl border-2 border-white animate-in zoom-in">
            HIERARCHY RULE APPLIED
          </div>
          <p className="mt-2 text-slate-500 font-bold uppercase tracking-widest text-[9px] bg-white/80 px-2 py-0.5 rounded-full">Cycle Prevented</p>
        </div>
      )}

      {isAvoidance && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
           <div className={`px-6 py-3 rounded-2xl font-black text-xl shadow-xl border-2 border-white transition-all duration-500 ${avoidanceState === 'scanning' ? 'bg-amber-500 text-white' : 'bg-rose-600 text-white'}`}>
            {avoidanceState === 'scanning' ? 'BANKER ANALYZING...' : 'REQUEST REJECTED: UNSAFE'}
          </div>
        </div>
      )}

      {isRecovery && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
           <div className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-black text-xl shadow-xl border-2 border-white animate-in zoom-in">
            ABORTING VICTIM (P2)
          </div>
          <p className="mt-2 text-slate-500 font-bold uppercase tracking-widest text-[9px] bg-white/80 px-2 py-0.5 rounded-full">Breaking the Circle</p>
        </div>
      )}

      <div className="absolute bottom-6 left-0 right-0 px-10 flex justify-between text-[9px] font-mono tracking-widest uppercase text-slate-400 font-bold">
        <div className="flex items-center gap-2"><div className="w-3 h-1 bg-emerald-600 rounded-full"></div> Holding</div>
        <div className="flex items-center gap-2"><div className="w-3 h-0 border-t border-dashed border-rose-600"></div> Requesting</div>
      </div>
    </div>
  );
};

export default RAGVisualizer;

