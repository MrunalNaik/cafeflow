"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// 4 café-themed cursor designs
const CURSOR_DESIGNS = [
  {
    label: "ring",
    render: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#d97d43" strokeWidth="2.5" fill="none" />
        <circle cx="16" cy="16" r="3" fill="#d97d43" />
      </svg>
    ),
  },
  {
    label: "bean",
    render: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="16" rx="10" ry="13" fill="#4b3621" />
        <path d="M16 4 Q22 10 22 16 Q22 22 16 28" stroke="#f5f5dc" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "steam",
    render: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M10 26 Q10 20 13 17 Q16 14 13 10 Q10 6 13 3" stroke="#d97d43" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M18 26 Q18 20 21 17 Q24 14 21 10 Q18 6 21 3" stroke="#4b3621" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M14 29 Q14 23 16 21" stroke="#d97d43" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "cup",
    render: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M7 10 L9 26 Q9 28 11 28 L21 28 Q23 28 23 26 L25 10 Z" fill="#4b3621" />
        <path d="M23 14 Q29 14 29 19 Q29 24 23 24" stroke="#4b3621" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="16" cy="29" rx="10" ry="2" fill="#d97d43" opacity="0.6" />
        <path d="M13 7 Q13 4 15 3" stroke="#d97d43" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M19 7 Q19 4 17 3" stroke="#d97d43" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
];

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [designIndex, setDesignIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast spring for main cursor
  const cursorX = useSpring(mouseX, { damping: 20, stiffness: 220, mass: 0.6 });
  const cursorY = useSpring(mouseY, { damping: 20, stiffness: 220, mass: 0.6 });

  // Slow spring for trailing ring
  const trailX = useSpring(mouseX, { damping: 35, stiffness: 100, mass: 1 });
  const trailY = useSpring(mouseY, { damping: 35, stiffness: 100, mass: 1 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX - 16);
    mouseY.set(e.clientY - 16);
  }, [mouseX, mouseY]);

  const handleClick = useCallback((e: MouseEvent) => {
    setDesignIndex((prev) => (prev + 1) % CURSOR_DESIGNS.length);
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsHovering(!!target.closest("a, button, [role='button'], input, select, textarea, label"));
  }, []);

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [handleMouseMove, handleClick, handleMouseDown, handleMouseUp, handleMouseOver]);

  if (!mounted) return null;

  const CurrentDesign = CURSOR_DESIGNS[designIndex].render;

  return (
    <>
      {/* Main cursor — fast spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.4 : 1,
          rotate: isHovering ? 15 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={designIndex}
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="drop-shadow-sm"
          >
            <CurrentDesign />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Trailing outer ring — slow spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: trailX, y: trailY }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="w-8 h-8 rounded-full border border-brand-orange/25" />
      </motion.div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9997] rounded-full border-2 border-brand-orange"
            style={{ left: ripple.x - 10, top: ripple.y - 10, width: 20, height: 20 }}
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 4.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
