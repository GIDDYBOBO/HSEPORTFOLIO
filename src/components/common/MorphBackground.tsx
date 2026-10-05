import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * MorphBackground
 * Luminous safety engineering canvas with organic morphing ambient gradients
 * and a reactive cursor glow.
 * Supports crisp white (#FFFFFF / #f8fafc) safety-grade aesthetic with
 * deep trust blues (#142C5C, #1C6CD4) and calming greens (#154E20, #96E2A5).
 */
export const MorphBackground: React.FC = () => {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!mousePos) {
        setMousePos({ x: targetX, y: targetY });
      }
    };

    // Smooth lerp animation loop for the cursor-following ambient glow
    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: Math.round(currentX), y: Math.round(currentY) });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isLight = true;

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#ffffff]"
    >
      {/* Precision Blueprint / Technical Micro-Grid Pattern */}
      <div 
        className="absolute inset-0 dialed-grid-pattern opacity-60 transition-opacity duration-500" 
      />

      {/* Layer A: Trust & Security Navy (#142C5C) + Ocean Blue (#1C6CD4) Ambient Mesh */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[58vw] h-[58vw] max-w-[900px] max-h-[900px] rounded-full blur-[110px] animate-morph-slow pointer-events-none transition-all duration-700 bg-gradient-to-br from-[#1C6CD4]/10 via-[#142C5C]/05 to-transparent" 
      />

      {/* Layer B: Safety & Environmental Well-being Emerald (#154E20) + Mint (#96E2A5) Mesh */}
      <div 
        className="absolute top-[18%] -right-[12%] w-[62vw] h-[62vw] max-w-[920px] max-h-[920px] rounded-full blur-[130px] animate-morph-reverse pointer-events-none transition-all duration-700 bg-gradient-to-bl from-[#96E2A5]/25 via-[#154E20]/08 to-transparent" 
      />

      {/* Layer C: Deep Trust Navy Anchor Mesh / Subtle Warm Horizon */}
      <div 
        className="absolute -bottom-[20%] left-[15%] w-[52vw] h-[52vw] max-w-[820px] max-h-[820px] rounded-full blur-[120px] animate-morph-slow pointer-events-none transition-all duration-700 bg-gradient-to-tr from-[#142C5C]/06 via-[#1C6CD4]/08 to-transparent" 
      />

      {/* Layer D: Subtle Golden Glow / Solar Irradiance for visual interest */}
      <div 
        className="absolute top-[45%] left-[35%] w-[38vw] h-[38vw] max-w-[600px] max-h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 bg-amber-100/30" 
      />

      {/* Ambient Engineering Floating Geometric Shapes */}
      <div className="absolute top-[12%] right-[8%] w-64 h-64 border border-[#1C6CD4]/15 rounded-3xl animate-float-slow-1 pointer-events-none" />
      <div className="absolute top-[50%] left-[5%] w-80 h-80 border border-emerald-500/15 rounded-full animate-float-slow-2 pointer-events-none" />
      <div className="absolute bottom-[15%] right-[15%] w-48 h-48 border border-[#142C5C]/10 rounded-2xl rotate-45 animate-float-slow-1 pointer-events-none" />

      {/* Reactive Mouse Spotlight Mesh: Calibrated Ocean Blue + Mint glow */}
      {mousePos && !isTouch && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle, rgba(28, 108, 212, 0.08) 0%, rgba(150, 226, 165, 0.08) 40%, rgba(255, 255, 255, 0) 70%)',
          }}
        />
      )}

      {/* Glass Frost Shading & Ambient Vignette Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500 bg-gradient-to-b from-[#ffffff]/30 via-transparent to-[#ffffff]/70" 
      />
    </div>
  );
};
