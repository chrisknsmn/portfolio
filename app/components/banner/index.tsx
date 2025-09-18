import { WavyBackground } from "./wavy-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative">
      {/* Background and border layer with fade */}
      <div
        className="absolute inset-0 border rounded-md bg-background"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      ></div>
      {/* Content layer without fade */}
      <div className="relative rounded-md overflow-hidden">
        <WavyBackground
          className=""
          containerClassName="h-full"
          waveOpacity={0.3}
        >
          <div className="absolute top-4 right-4">
            <div className="rounded-full aspect-square h-16 w-auto p-2 bg-white/10 backdrop-blur-sm flex itemc-center justify-center">
              <Image
                src="/logo.svg"
                alt=""
                width="100"
                height="100"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="mt-24 p-4 pt-2 sm:pt-0">
            <h1 className="leading-tight text-[clamp(1.75rem,calc(1rem+6vw),5rem)]">
              Chris Kinsman
            </h1>
            <p className="text-sm mb-4">
              Front-End & Full-Stack Web Developer | 6+ YOE Delivering Scalable,
              User-Centered Apps for Enterprise & Modern Web (RBC, Fidelity) |
              React, Next.js, TypeScript | Reliable, Detail-Driven,
              Outcome-Focused
            </p>
            <Link href="#contact">
              <Button>Contact</Button>
            </Link>
          </div>
        </WavyBackground>
      </div>
    </div>
  );
}
