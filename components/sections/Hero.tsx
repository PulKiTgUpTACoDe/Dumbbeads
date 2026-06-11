"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Particle types ──
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  type: "dot" | "ring" | "star";
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 5,
    drift: (Math.random() - 0.5) * 40,
    type: (["dot", "ring", "star"] as const)[Math.floor(Math.random() * 3)],
  }));
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<Particle[]>([]);

  // ── Mouse tracking for interactive parallax ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const bgMoveX = useTransform(smoothX, [0, 1], [-250, 250]);
  const bgMoveY = useTransform(smoothY, [0, 1], [-250, 250]);
  const contentMoveX = useTransform(smoothX, [0, 1], [-50, 50]);
  const contentMoveY = useTransform(smoothY, [0, 1], [-50, 50]);
  const logoMoveX = useTransform(smoothX, [0, 1], [-15, 15]);
  const logoMoveY = useTransform(smoothY, [0, 1], [-15, 15]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    },
    [mouseX, mouseY]
  );

  // ── Init particles ──
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generateParticles(35));
  }, []);

  // ── GSAP entry timeline ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { scale: 0.8, opacity: 0, rotate: -5 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.4 },
          0
        );
      }

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".hero-word");
        tl.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: 45 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.06, duration: 1 },
          0.2
        );
      }

      if (bgRef.current) {
        const orbs = bgRef.current.querySelectorAll(".parallax-orb");
        tl.fromTo(
          orbs,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.15, duration: 1.5, ease: "elastic.out(1,0.5)" },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Continuous orb breathing + drifting + scroll parallax ──
  useEffect(() => {
    if (!bgRef.current) return;

    const orbs = bgRef.current.querySelectorAll(".parallax-orb");
    const tweens: gsap.core.Tween[] = [];

    orbs.forEach((orb, i) => {
      // Float
      tweens.push(
        gsap.to(orb, {
          y: `+=${20 + i * 10}`,
          x: `+=${10 + i * 5}`,
          duration: 4 + i * 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      );
      // Breathe
      tweens.push(
        gsap.to(orb, {
          scale: 1 + (i + 1) * 0.08,
          duration: 3 + i,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.5,
        })
      );
      // Scroll parallax
      tweens.push(
        gsap.to(orb, {
          y: `+=${(i + 1) * -50}`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      );
    });

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  // ── Logo ring rotation ──
  useEffect(() => {
    if (!logoRef.current) return;
    const ring = logoRef.current.querySelector(".logo-ring");
    if (!ring) return;
    const t = gsap.to(ring, { rotate: 360, duration: 20, ease: "none", repeat: -1 });
    return () => { t.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden transition-colors duration-400"
    >
      {/* LAYER 1 — Animated gradient background */}
      <div className="absolute inset-0 hero-gradient-bg" />

      {/* LAYER 2 — Aurora nebula blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full dark:opacity-20 opacity-100"
          style={{
            background: "radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)",
            x: bgMoveX,
            y: bgMoveY,
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/3 -right-1/4 w-[700px] h-[700px] rounded-full dark:opacity-15 opacity-100"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }}
          animate={{ scale: [1.1, 0.9, 1.1], rotate: [0, -30, 0], x: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full dark:opacity-10 opacity-8"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)" }}
          animate={{ scale: [0.8, 1.15, 0.8], y: [0, -60, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* LAYER 3 — Parallax orbs (mouse-reactive) */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ x: bgMoveX, y: bgMoveY, willChange: "transform" }}
      >
        <div className="parallax-orb absolute top-[10%] left-[20%] w-72 h-72 dark:bg-purple-500/25 bg-indigo-900/15 rounded-full blur-3xl will-change-transform" />
        <div className="parallax-orb absolute bottom-[15%] right-[15%] w-80 h-80 dark:bg-blue-500/20 bg-blue-900/10 rounded-full blur-3xl will-change-transform" />
        <div className="parallax-orb absolute top-[40%] left-[55%] w-96 h-96 dark:bg-pink-500/15 bg-violet-900/10 rounded-full blur-3xl will-change-transform" />
        <div className="parallax-orb absolute top-[60%] left-[10%] w-64 h-64 dark:bg-indigo-500/15 bg-blue-900/10 rounded-full blur-3xl will-change-transform" />
      </motion.div>

      {/* LAYER 4 — Multi-type particle system */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.type === "ring" ? p.size * 3 : p.size,
              height: p.type === "ring" ? p.size * 3 : p.size,
              background:
                p.type === "ring" ? "none"
                  : p.type === "star" ? "var(--theme-text-muted)"
                  : "var(--theme-text-muted)",
              border: p.type === "ring" ? "1px solid var(--theme-border)" : "none",
              boxShadow: p.type === "star" ? "0 0 6px var(--theme-text-muted)" : "none",
              opacity: 0.4,
            }}
            animate={{
              y: [0, -(80 + p.drift), 0],
              x: [0, p.drift, 0],
              opacity: [0, 0.6, 0],
              scale: p.type === "star" ? [0.5, 1.2, 0.5] : [1, 1, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* LAYER 5 — Subtle mesh grid */}
      <div
        className="absolute inset-0 dark:opacity-[0.03] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--theme-text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--theme-text-muted) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* LAYER 6 — Content (mouse-reactive) */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-20 text-center"
        style={{ x: contentMoveX, y: contentMoveY }}
      >
        <div className="space-y-8">
          {/* ── Logo with rotating ring + glow ── */}
          <motion.div
            ref={logoRef}
            className="flex justify-center mb-6 opacity-0"
            style={{ willChange: "transform, opacity", x: logoMoveX, y: logoMoveY }}
          >
            <div className="relative">
              {/* Rotating conic-gradient ring */}
              <div
                className="logo-ring absolute -inset-3 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(168,85,247,0.5), rgba(236,72,153,0.5), rgba(59,130,246,0.5), rgba(168,85,247,0.5))",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "2px",
                  borderRadius: "9999px",
                  willChange: "transform",
                }}
              />
              {/* Pulsing glow */}
              <motion.div
                className="absolute -inset-6 rounded-full dark:bg-purple-500/20 bg-indigo-400/15 blur-xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 dark:border-white/10 border-indigo-200/50 shadow-2xl dark:shadow-purple-500/40 shadow-indigo-400/30 dark:bg-white/5 bg-white/50 backdrop-blur-sm">
                <Image
                  src="/images/logo-new.jpg"
                  alt="Dumbbeads Logo"
                  fill
                  className="object-cover scale-125"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* ── Floating badge ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full dark:bg-white/5 bg-white/60 backdrop-blur-md border dark:border-white/10 border-indigo-200/50"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400 dark:text-yellow-400" />
              </motion.div>
              <span className="text-sm font-medium text-theme-primary">
                Handcrafted with Love
              </span>
            </motion.div>
          </motion.div>

          {/* ── Shimmer gradient headline ── */}
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight overflow-hidden"
            style={{ perspective: "800px" }}
          >
            <span
              className="hero-word inline-block hero-gradient-text"
              style={{ willChange: "transform, opacity" }}
            >
              dumbbeads
            </span>
          </h1>

          {/* ── Subheadline with animated gradient ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl max-w-2xl mx-auto"
          >
            <motion.span
              className="inline-block hero-subheading-gradient"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              Handcrafted Beaded Jewelry
            </motion.span>
          </motion.p>

          {/* ── Breathing tagline ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.span
              className="text-base md:text-lg text-theme-muted"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Unique. Minimal. Handmade.
            </motion.span>
          </motion.p>

          {/* ── CTA with animated glow border ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-4"
          >
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-block relative group"
            >
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-60 blur-lg group-hover:opacity-80 transition-opacity duration-300"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% auto" }}
              />
            </motion.div>
          </motion.div>

          {/* ── Scroll indicator ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pt-12"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="w-6 h-10 border-2 dark:border-white/20 border-indigo-300/40 rounded-full p-1 backdrop-blur-sm">
                <motion.div
                  className="w-1.5 h-3 rounded-full mx-auto dark:bg-gradient-to-b dark:from-white/60 dark:to-white/20 bg-gradient-to-b from-indigo-500/60 to-indigo-300/20"
                  animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* LAYER 7 — Vignette */}
      <div className="absolute inset-0 pointer-events-none dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(200,210,230,0.3)_100%)]" />
    </section>
  );
}
