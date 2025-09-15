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
      {/* Content layer (not faded) */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-4xl font-bold text-black">Chris Kinsman</h1>
            <h2 className="text-6xl font-bold text-black">Design / Development</h2>
          </div>
          <div className="flex-shrink-0 hidden lg:block" aria-hidden="true">
            <div
              className="
                relative rounded-full overflow-hidden
                w-full h-auto 
                aspect-1/1
                bg-white/10 backdrop-blur-lg
              "
            >
              {/* logo centered; fits inside, width:100%, max-width:72px, height:auto */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="w-full max-w-[50px] h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg leading-relaxed max-w-4xl text-muted-foreground">
          Front-End & Full-Stack Web Developer | 6+ YOE Delivering Scalable,
          User-Centered Apps for Enterprise & Modern Web (RBC, Fidelity) | React,
          Next.js, TypeScript | Reliable, Detail-Driven, Outcome-Focused
        </p>
      </div>
    </div>
  );
}
