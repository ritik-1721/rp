'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [onInput, setOnInput] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // ── Outer box: slow trailing spring ──────────────────────────
  const outerX = useSpring(mouseX, { stiffness: 55, damping: 16, mass: 0.5 });
  const outerY = useSpring(mouseY, { stiffness: 55, damping: 16, mass: 0.5 });

  // ── Inner dot: fast spring ────────────────────────────────────
  const innerX = useSpring(mouseX, { stiffness: 600, damping: 32 });
  const innerY = useSpring(mouseY, { stiffness: 600, damping: 32 });

  // ── Reactive sizes as MotionValues (needed by useTransform) ──
  const outerSizeMV = useMotionValue(32);
  const innerBorderSizeMV = useMotionValue(12);

  useEffect(() => {
    outerSizeMV.set(clicking ? 20 : hovering ? 52 : 32);
    innerBorderSizeMV.set((clicking ? 5 : 8) + 4);
  }, [clicking, hovering, outerSizeMV, innerBorderSizeMV]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, label'
      );
      setHovering(!!el);

      // Detect text input fields
      const inputEl = (e.target as HTMLElement).closest('input, textarea');
      if (inputEl) {
        const tag = inputEl.tagName.toLowerCase();
        if (tag === 'textarea') {
          setOnInput(true);
        } else {
          const type = (inputEl as HTMLInputElement).type?.toLowerCase();
          const textTypes = ['text', 'email', 'password', 'search', 'tel', 'url', 'number'];
          setOnInput(textTypes.includes(type || 'text'));
        }
      } else {
        setOnInput(false);
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  const outerSize = clicking ? 20 : hovering ? 52 : 32;
  const outerOffset = outerSize / 2;
  const innerSize = clicking ? 5 : 8;
  const innerBorderSize = innerSize + 4;

  // ── Text cursor (I-beam) mode ──────────────────────────────────
  if (onInput) {
    return (
      <>
        {/* Big I-beam text cursor */}
        <motion.div
          style={{
            position: 'fixed', top: 0, left: 0,
            x: innerX, y: innerY,
            translateX: '-50%', translateY: '-50%',
            pointerEvents: 'none',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: visible ? 1 : 0,
          }}
          transition={{ opacity: { duration: 0.1 } }}
        >
          {/* Top bar */}
          <div style={{
            width: 18,
            height: 2,
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: 1,
          }} />
          {/* Vertical stem */}
          <div style={{
            width: 2,
            height: 32,
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: 1,
          }} />
          {/* Bottom bar */}
          <div style={{
            width: 18,
            height: 2,
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: 1,
          }} />
        </motion.div>
      </>
    );
  }

  return (
    <>


      {/* ─────────────────────────────────────────────────────────
          Outer trailing square — mix-blend: difference → auto-inverts
      ───────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: outerX, y: outerY,
          translateX: `-${outerOffset}px`,
          translateY: `-${outerOffset}px`,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          border: '1.5px solid #FFFFFF',
        }}
        animate={{
          width: outerSize,
          height: outerSize,
          opacity: visible ? 1 : 0,
          rotate: hovering ? 45 : 0,
        }}
        transition={{
          width: { duration: 0.22, ease: 'easeOut' },
          height: { duration: 0.22, ease: 'easeOut' },
          rotate: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.15 },
        }}
      />

      {/* ─────────────────────────────────────────────────────────
          Inner dot: light white border (no blend — stays subtle)
      ───────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: innerX, y: innerY,
          translateX: '-50%', translateY: '-50%',
          width: innerBorderSize,
          height: innerBorderSize,
          border: `1.5px solid rgba(255,255,255,0.45)`,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.1 } }}
      />

      {/* ─────────────────────────────────────────────────────────
          Inner dot fill — mix-blend: difference → auto-inverts
      ───────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: innerX, y: innerY,
          translateX: '-50%', translateY: '-50%',
          width: innerSize,
          height: innerSize,
          backgroundColor: '#FFFFFF',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.1 } }}
      />
    </>
  );
}
