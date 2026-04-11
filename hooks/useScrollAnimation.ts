"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationConfig {
  /** Animation type: 'fade-up', 'fade-in', 'slide-left', 'slide-right', 'scale' */
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Scrub mode */
  scrub?: boolean | number;
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Stagger children by this amount */
  stagger?: number;
  /** Selector for stagger children */
  staggerSelector?: string;
  /** Only trigger animation once */
  once?: boolean;
  /** Markers for debugging */
  markers?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  config: ScrollAnimationConfig = {}
) {
  const ref = useRef<T>(null);

  const {
    animation = "fade-up",
    start = "top 85%",
    end = "top 30%",
    scrub = false,
    duration = 1,
    delay = 0,
    stagger = 0,
    staggerSelector,
    once = true,
    markers = false,
  } = config;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = staggerSelector ? el.querySelectorAll(staggerSelector) : el;

    // Set initial state based on animation type
    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = { opacity: 1, duration, delay, ease: "power3.out" };

    switch (animation) {
      case "fade-up":
        fromVars.y = 60;
        toVars.y = 0;
        break;
      case "fade-in":
        break;
      case "slide-left":
        fromVars.x = 80;
        toVars.x = 0;
        break;
      case "slide-right":
        fromVars.x = -80;
        toVars.x = 0;
        break;
      case "scale":
        fromVars.scale = 0.95;
        toVars.scale = 1;
        break;
    }

    if (stagger && staggerSelector) {
      toVars.stagger = stagger;
    }

    gsap.set(targets, fromVars);

    const tween = gsap.to(targets, {
      ...toVars,
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        once,
        markers,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animation, start, end, scrub, duration, delay, stagger, staggerSelector, once, markers]);

  return ref;
}
