import { WavyBackground } from "./wavy-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="border rounded-md overflow-hidden relative">
      <WavyBackground
        className=""
        containerClassName="h-full"
        waveOpacity={0.3}
      >
        <div className="mt-24 p-4 pt-2 sm:pt-0">
          <h1 className="leading-tight text-[clamp(1.75rem,calc(1rem+6vw),5rem)]">
            Chris Kinsman
          </h1>
          <p className="text-sm opacity-90 mb-4">
            Front-End & Full-Stack Web Developer | 6+ YOE Delivering Scalable,
            User-Centered Apps for Enterprise & Modern Web (RBC, Fidelity) |
            React, Next.js, TypeScript | Reliable, Detail-Driven,
            Outcome-Focused
          </p>
          <Link href="/">
            <Button>Contact</Button>
          </Link>
        </div>
      </WavyBackground>
    </div>
  );
}
