"use client";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      {/* Fading glass background + themed border + shadow */}
      <div
        className="
          absolute inset-0 rounded-lg
          bg-white/20 backdrop-blur-lg
          [box-shadow:0_0_0_1px_theme(colors.foreground/10%)_inset,0_10px_15px_-3px_rgba(0,0,0,0.2),0_4px_6px_-4px_rgba(0,0,0,0.2)]
          [mask-image:linear-gradient(to_bottom,white,transparent)]
          [mask-repeat:no-repeat]
          [mask-size:100%_100%]
          [-webkit-mask-image:linear-gradient(to_bottom,white,transparent)]
          [-webkit-mask-repeat:no-repeat]
          [-webkit-mask-size:100%_100%]
        "
      />

      {/* Content layer */}
      <div className="relative z-10 p-4 space-y-4">
        {/* Wrapper is relative so the badge can be absolutely positioned against it */}
        <div className="relative">
          {/* Banner image (clips its own contents, but NOT the external badge) */}
          <div className="relative h-24 w-full rounded-md overflow-hidden z-0">
            <Image
              src="/bnr-gradient.jpg"
              alt="Banner"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Badge overlaps the bottom of the banner image */}
          <div>
            <div
              className="
                absolute right-3
                top-[calc(theme(spacing.24)-42px)]  /* 24 = 6rem banner height; 42px = half of badge height (84px) */
                z-30
                w-[84px] h-[84px]
                rounded-full overflow-hidden
                bg-white/30 backdrop-blur-xl backdrop-saturate-150
              "
            >
              <div className="relative z-10 w-full h-full flex items-center justify-center p-3">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-full max-w-[56px] h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Titles now sit BELOW the banner section; add top padding so they don't collide with the overlapping badge */}
        <div>
          <h1 className="text-4xl font-bold text-black">Chris Kinsman</h1>
          <h2 className="text-6xl font-bold text-black">Design / Development</h2>
        </div>

        <p className="text-lg leading-relaxed max-w-4xl text-muted-foreground px-2">
          Front-End & Full-Stack Web Developer | 6+ YOE Delivering Scalable,
          User-Centered Apps for Enterprise & Modern Web (RBC, Fidelity) | React,
          Next.js, TypeScript | Reliable, Detail-Driven, Outcome-Focused
        </p>
      </div>
    </div>
  );
}
