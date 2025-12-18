
import React, { useState, useEffect } from 'react';

interface Props {
  mode: 'deadlock' | 'scenario-status' | 'safe' | 'interactive-rag';
  step?: number;
}

const RAGVisualizer: React.FC<Props> = ({ mode, step = 4 }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    setSelectedNode(null);
  }, [mode, step]);

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

  const isSafe = mode === 'safe';
  
  const getOpacity = (id: string) => {
    if (!selectedNode) return 1;
    if (selectedNode === id) return 1;
    const connections: Record<string, string[]> = {
      'P1': ['Knife', 'Bread'],
      'P2': ['Bread', 'Plate'],
      'P3': ['Plate', 'Knife'],
      'Knife': ['P1', 'P3'],
      'Bread': ['P2', 'P1'],
      'Plate': ['P3', 'P2']
    };
    return connections[selectedNode]?.includes(id) ? 0.9 : 0.15;
  };

  const isEdgeHighlighted = (from: string, to: string) => {
    if (!selectedNode) return true;
    return selectedNode === from || selectedNode === to;
  };

  return (
    <div className={`relative w-full max-w-xl aspect-square bg-white rounded-[48px] border ${isSafe ? 'border-emerald-200 shadow-emerald-500/5' : 'border-slate-200'} shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] p-10 overflow-hidden transition-colors duration-700`}>
      <svg viewBox="0 0 500 500" className="w-full h-full select-none" onClick={() => setSelectedNode(null)}>
        <defs>
          <marker id="arrowhead-hold" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" className="fill-emerald-600" />
          </marker>
          <marker id="arrowhead-req" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0 0, 10 4, 0 8" className="fill-rose-600" />
          </marker>
        </defs>

        {/* --- EDGES --- */}
        <g className="transition-opacity duration-300">
          {/* P1 connections */}
          {(mode !== 'deadlock' || step >= 1) && (
            <>
              <path d="M 370 210 Q 280 180 260 120" fill="none" className="stroke-emerald-600 stroke-[3px] transition-all" markerEnd="url(#arrowhead-hold)" opacity={isEdgeHighlighted('P1', 'Knife') ? 1 : 0.05} />
              <path d="M 205 75 Q 110 85 95 165" fill="none" className="stroke-rose-600 stroke-2 transition-all" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" opacity={isEdgeHighlighted('P1', 'Bread') ? 1 : 0.05} />
            </>
          )}

          {/* P2 connections */}
          {(mode !== 'deadlock' || step >= 2) && (
            <>
              <path d="M 95 250 L 85 355" fill="none" className="stroke-emerald-600 stroke-[3px] transition-all" markerEnd="url(#arrowhead-hold)" opacity={isEdgeHighlighted('P2', 'Bread') ? 1 : 0.05} />
              <path d="M 130 400 L 205 400" fill="none" className="stroke-rose-600 stroke-2 transition-all" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" opacity={isEdgeHighlighted('P2', 'Plate') ? 1 : 0.05} />
            </>
          )}

          {/* P3 connections */}
          {(mode !== 'deadlock' || step >= 3) && (
            <>
              {!isSafe && <path d="M 295 400 L 370 400" fill="none" className="stroke-emerald-600 stroke-[3px] transition-all" markerEnd="url(#arrowhead-hold)" opacity={isEdgeHighlighted('P3', 'Plate') ? 1 : 0.05} />}
              <path d="M 415 355 L 415 255" fill="none" className="stroke-rose-600 stroke-2 transition-all" strokeDasharray="6,4" markerEnd="url(#arrowhead-req)" opacity={isEdgeHighlighted('P3', 'Knife') ? 1 : 0.05} />
            </>
          )}
        </g>

        {/* --- RESOURCES --- */}
        <g>
          {/* Knife */}
          {(mode !== 'deadlock' || step >= 1) && (
            <g transform="translate(370, 170)" className="cursor-pointer transition-all duration-300" onClick={(e) => { e.stopPropagation(); setSelectedNode('Knife'); }} opacity={getOpacity('Knife')}>
              <rect width="80" height="80" rx="20" className={`fill-slate-50 stroke-indigo-100 stroke-2 transition-all ${selectedNode === 'Knife' ? 'stroke-blue-500 stroke-[4px]' : ''}`} />
              <text x="40" y="62" textAnchor="middle" className="fill-indigo-900 font-black text-[10px] uppercase tracking-wider">1. Knife</text>
              <text x="40" y="42" textAnchor="middle" className="text-2xl">🔪</text>
            </g>
          )}
          
          {/* Bread */}
          {(mode !== 'deadlock' || step >= 1) && (
            <g transform="translate(50, 170)" className="cursor-pointer transition-all duration-300" onClick={(e) => { e.stopPropagation(); setSelectedNode('Bread'); }} opacity={getOpacity('Bread')}>
              <rect width="80" height="80" rx="20" className={`fill-slate-50 stroke-amber-100 stroke-2 transition-all ${selectedNode === 'Bread' ? 'stroke-amber-500 stroke-[4px]' : ''}`} />
              <text x="40" y="62" textAnchor="middle" className="fill-amber-900 font-black text-[10px] uppercase tracking-wider">2. Bread</text>
              <text x="40" y="42" textAnchor="middle" className="text-2xl">🍞</text>
            </g>
          )}
          
          {/* Plate */}
          {(mode !== 'deadlock' || step >= 2) && (
            <g transform="translate(210, 360)" className="cursor-pointer transition-all duration-300" onClick={(e) => { e.stopPropagation(); setSelectedNode('Plate'); }} opacity={getOpacity('Plate')}>
              <rect width="80" height="80" rx="20" className={`fill-slate-50 stroke-rose-100 stroke-2 transition-all ${selectedNode === 'Plate' ? 'stroke-rose-500 stroke-[4px]' : ''}`} />
              <text x="40" y="62" textAnchor="middle" className="fill-rose-900 font-black text-[10px] uppercase tracking-wider">3. Plate</text>
              <text x="40" y="42" textAnchor="middle" className="text-2xl">🍽️</text>
            </g>
          )}
        </g>

        {/* --- PROCESSES --- */}
        <g>
          {(mode !== 'deadlock' || step >= 1) && (
            <g className="cursor-pointer transition-all duration-300" onClick={(e) => { e.stopPropagation(); setSelectedNode('P1'); }} opacity={getOpacity('P1')}>
              <circle cx="250" cy="75" r="40" className={`fill-blue-600 stroke-white stroke-[4px] shadow-lg transition-all ${selectedNode === 'P1' ? 'stroke-blue-200' : ''}`} />
              <text x="250" y="82" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P1</text>
            </g>
          )}

          {(mode !== 'deadlock' || step >= 2) && (
            <g className="cursor-pointer transition-all duration-300" onClick={(e) => { e.stopPropagation(); setSelectedNode('P2'); }} opacity={getOpacity('P2')}>
              <circle cx="85" cy="400" r="40" className={`fill-emerald-600 stroke-white stroke-[4px] transition-all ${selectedNode === 'P2' ? 'stroke-emerald-200' : ''}`} />
              <text x="85" y="407" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P2</text>
            </g>
          )}

          {(mode !== 'deadlock' || step >= 3) && (
            <g className="cursor-pointer transition-all duration-300" onClick={(e) => { e.stopPropagation(); setSelectedNode('P3'); }} opacity={getOpacity('P3')}>
              <circle cx="415" cy="400" r="40" className={`fill-purple-600 stroke-white stroke-[4px] transition-all ${selectedNode === 'P3' ? 'stroke-purple-200' : ''}`} />
              <text x="415" y="407" textAnchor="middle" className="fill-white font-black text-xl tracking-tighter">P3</text>
            </g>
          )}
        </g>
      </svg>
      
      {step >= 3 && !isSafe && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
           <div className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-black text-2xl animate-bounce shadow-xl border-2 border-white">
            DEADLOCK!
          </div>
        </div>
      )}

      {isSafe && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
           <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black text-2xl animate-pulse shadow-xl border-2 border-white">
            SYSTEM SAFE
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-0 right-0 px-10 flex justify-between items-end">
        <div className="text-[9px] font-mono tracking-widest uppercase text-slate-400 font-bold space-y-1">
          <div className="flex items-center gap-2"><div className="w-3 h-1 bg-emerald-600 rounded-full"></div> Holding</div>
          <div className="flex items-center gap-2"><div className="w-3 h-0 border-t border-dashed border-rose-600"></div> Waiting</div>
        </div>
        <div className="text-[8px] font-mono text-slate-300 italic">Click nodes to inspect</div>
      </div>
    </div>
  );
};

export default RAGVisualizer;

