"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StoryBlock {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const storyBlocks: StoryBlock[] = [
  {
    title: "Handcrafted with Love",
    subtitle: "The Art of Beadwork",
    description:
      "Every single piece is meticulously assembled by hand, bead by bead. No machines, no shortcuts — just genuine craftsmanship poured into every design.",
    image: "/images/gallery-1/image1.webp",
  },
  {
    title: "Every Bead Tells a Story",
    subtitle: "Unique by Nature",
    description:
      "We source premium beads from around the world. Each piece carries its own character — colors, textures, and patterns that make your jewelry one of a kind.",
    image: "/images/gallery-3/image11.webp",
  },
  {
    title: "Made Just for You",
    subtitle: "Personal & Intentional",
    description:
      "From choosing your design to the final knot, every order is crafted with intention. This isn't fast fashion — it's jewelry that means something.",
    image: "/images/gallery-5/get.jpeg",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each story block
      const blocks = document.querySelectorAll(".story-block");

      blocks.forEach((block) => {
        const textEl = block.querySelector(".story-text");
        const imageEl = block.querySelector(".story-image");
        const titleEl = block.querySelector(".story-title");
        const subtitleEl = block.querySelector(".story-subtitle");
        const descEl = block.querySelector(".story-desc");

        // Text container fade + slide
        if (textEl) {
          gsap.fromTo(
            textEl,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            },
          );
        }

        // Staggered text reveal
        const textItems = [subtitleEl, titleEl, descEl].filter(Boolean);
        if (textItems.length > 0) {
          gsap.fromTo(
            textItems,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 75%",
                end: "top 35%",
                scrub: true,
              },
            },
          );
        }

        // Image zoom/slide in
        if (imageEl) {
          gsap.fromTo(
            imageEl,
            { scale: 1.15, opacity: 0, x: 40 },
            {
              scale: 1,
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4 bg-theme-primary transition-colors duration-400">
      <div className="container mx-auto max-w-7xl space-y-24 md:space-y-40">
        {storyBlocks.map((block, index) => (
          <div
            key={index}
            className={`story-block grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
              index % 2 === 1 ? "md:direction-rtl" : ""
            }`}
            style={{
              direction: index % 2 === 1 ? "rtl" : "ltr",
            }}
          >
            {/* Text Block */}
            <div
              className="story-text space-y-4 md:space-y-6"
              style={{ direction: "ltr", willChange: "transform, opacity" }}
            >
              <p className="story-subtitle text-sm md:text-base font-medium dark:text-purple-400 text-indigo-600 uppercase tracking-widest">
                {block.subtitle}
              </p>
              <h2 className="story-title text-3xl md:text-4xl lg:text-5xl font-bold text-theme-primary leading-tight">
                {block.title}
              </h2>
              <p className="story-desc text-base md:text-lg text-theme-muted leading-relaxed max-w-lg">
                {block.description}
              </p>
            </div>

            {/* Image Block */}
            <div
              className="story-image relative aspect-[4/3] rounded-2xl overflow-hidden bg-theme-tertiary"
              style={{ direction: "ltr", willChange: "transform, opacity" }}
            >
              <Image
                src={block.image}
                alt={block.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* linear overlay */}
              <div className="absolute inset-0 dark:bg-linear-to-t dark:from-neutral-950/40 dark:to-transparent bg-linear-to-t from-white/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
