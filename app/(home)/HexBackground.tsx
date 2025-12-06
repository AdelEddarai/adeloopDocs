import React from 'react';

export const HexBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] pointer-events-none select-none isolate">
       {/* Base Grid - Vercel style thin lines */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

       {/* Primary Top Glow (Spotlight) */}
       <div className="absolute left-0 right-0 top-[-10%] h-[500px] w-full rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,0.05),rgba(255,255,255,0))] blur-[100px] opacity-70" />
       
       {/* Secondary Top Glow (Blue accent often used by Vercel) */}
       <div className="absolute top-0 inset-x-0 h-[500px] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

       {/* Bottom fade to black */}
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent" />
    </div>
  );
};