"use client";
import Image from "next/image";
import { Section } from "@/components/ui/main";
import Grid from "./grid";

export default function Banner() {
  return (
    <div className="p-4 py-24">
      <div className="relative w-full rounded-lg overflow-hidden">
        {/* Fading glass background + themed border + shadow */}
        <div
          className="
            absolute inset-0 rounded-lg
            bg-white/20 backdrop-blur-lg
            [box-shadow:0_0_0_1px_theme(colors.foreground/50%)_inset,0_10px_15px_-3px_rgba(0,0,0,0.2),0_4px_6px_-4px_rgba(0,0,0,0.2)]
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
          <div className="[container-type:inline-size] relative">
            <h1 className="font-bold text-black whitespace-nowrap leading-none tracking-tight text-[10cqw] md:text-[8cqw] mb-2 pr-16">
              Chris Kinsman
            </h1>
            <h2 className="font-bold text-black whitespace-nowrap leading-none tracking-tight text-[14cqw] md:text-[8cqw]">
              Design / <br className="block md:hidden" />
              Development
            </h2>
          </div>
          <p className="text-lg leading-relaxed max-w-4xl text-muted-foreground">
            Front-End & Full-Stack Web Developer | 6+ YOE Delivering Scalable,
            User-Centered Apps for Enterprise & Modern Web (RBC, Fidelity) | React,
            Next.js, TypeScript | Reliable, Detail-Driven, Outcome-Focused
          </p>
        </div>
      </div>
    </div>
  );
}
