import React from 'react';
import { Tooth, ToothCondition } from '../types';

interface OdontogramProps {
  teeth: Tooth[];
  onToothClick?: (tooth: Tooth) => void;
}

const ToothIcon: React.FC<{ tooth: Tooth; onClick?: () => void }> = ({ tooth, onClick }) => {
  const getColor = (condition: ToothCondition) => {
    switch (condition) {
      case ToothCondition.HEALTHY: return 'fill-slate-100 stroke-slate-400';
      case ToothCondition.CAVITY: return 'fill-red-200 stroke-red-500';
      case ToothCondition.TREATED: return 'fill-blue-200 stroke-blue-500';
      case ToothCondition.MISSING: return 'fill-slate-800 stroke-slate-600 opacity-20';
      case ToothCondition.CROWN: return 'fill-yellow-100 stroke-yellow-500';
      default: return 'fill-slate-100 stroke-slate-400';
    }
  };

  // Simplified Molar shape with responsive sizing
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer group transition-transform hover:scale-110 w-8 sm:w-10 shrink-0"
    >
      <span className="text-[10px] sm:text-xs text-slate-400 mb-1 font-mono">{tooth.number}</span>
      <svg 
        viewBox="0 0 100 120" 
        className={`${getColor(tooth.condition)} w-full h-auto transition-colors duration-300 drop-shadow-sm`}
        strokeWidth="4"
      >
        <path d="M20,30 Q10,30 10,50 L15,100 Q15,110 25,110 L35,100 L50,110 L65,100 L75,110 Q85,110 85,100 L90,50 Q90,30 80,30 Q70,10 50,10 Q30,10 20,30 Z" />
        {/* Detail lines for chewing surface */}
        <path d="M30,30 Q50,50 70,30" fill="none" strokeOpacity="0.3" />
      </svg>
      <span className="mt-1 text-[9px] sm:text-[10px] font-semibold text-slate-500 truncate w-full text-center h-4">
        {tooth.condition === ToothCondition.HEALTHY ? '' : tooth.condition}
      </span>
    </div>
  );
};

export const Odontogram: React.FC<OdontogramProps> = ({ teeth, onToothClick }) => {
  // Split into Upper (1-16) and Lower (17-32)
  // Standard chart layout:
  // Upper Right: 1-8 | Upper Left: 9-16
  // Lower Right: 32-25 | Lower Left: 24-17
  
  const upperTeeth = teeth.filter(t => t.number <= 16).sort((a, b) => a.number - b.number);
  const lowerTeeth = teeth.filter(t => t.number > 16).sort((a, b) => b.number - a.number); // 32 to 17 order

  // Further split for quadrants visually
  const upperRight = upperTeeth.filter(t => t.number <= 8);
  const upperLeft = upperTeeth.filter(t => t.number > 8);
  
  const lowerRight = lowerTeeth.filter(t => t.number >= 25);
  const lowerLeft = lowerTeeth.filter(t => t.number < 25);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
        <span className="w-2 h-6 bg-blue-500 rounded-full mr-2"></span>
        Odontograma Digital
      </h3>
      
      {/* Scrollable Container for small screens */}
      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex flex-col gap-8 md:gap-12 min-w-[700px] lg:min-w-0 mx-auto px-2">
          
          {/* Upper Arch */}
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs md:text-sm text-slate-400 uppercase tracking-widest font-bold whitespace-nowrap">Arcada Superior</div>
            <div className="flex justify-center gap-4 md:gap-8 border-b-2 border-slate-100 pb-6 md:pb-8 pt-2">
              <div className="flex gap-1 md:gap-2">
                {upperRight.map(t => (
                  <ToothIcon key={t.id} tooth={t} onClick={() => onToothClick && onToothClick(t)} />
                ))}
              </div>
              <div className="w-px bg-slate-300 h-auto mx-1 md:mx-2 self-stretch opacity-50"></div>
              <div className="flex gap-1 md:gap-2">
                {upperLeft.map(t => (
                  <ToothIcon key={t.id} tooth={t} onClick={() => onToothClick && onToothClick(t)} />
                ))}
              </div>
            </div>
          </div>

          {/* Lower Arch */}
          <div className="relative">
             <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs md:text-sm text-slate-400 uppercase tracking-widest font-bold whitespace-nowrap">Arcada Inferior</div>
             <div className="flex justify-center gap-4 md:gap-8 border-t-2 border-slate-100 pt-6 md:pt-8 pb-2">
              <div className="flex gap-1 md:gap-2">
                {lowerRight.map(t => (
                  <ToothIcon key={t.id} tooth={t} onClick={() => onToothClick && onToothClick(t)} />
                ))}
              </div>
               <div className="w-px bg-slate-300 h-auto mx-1 md:mx-2 self-stretch opacity-50"></div>
              <div className="flex gap-1 md:gap-2">
                {lowerLeft.map(t => (
                  <ToothIcon key={t.id} tooth={t} onClick={() => onToothClick && onToothClick(t)} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-slate-500">
        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-400 mr-2"></span> Saudável</div>
        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-200 border border-red-500 mr-2"></span> Cárie</div>
        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-200 border border-blue-500 mr-2"></span> Tratado</div>
        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-500 mr-2"></span> Coroa</div>
        <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-slate-800 mr-2"></span> Ausente</div>
      </div>
    </div>
  );
};
