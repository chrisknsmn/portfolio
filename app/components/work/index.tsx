import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Work() {
  return (
    <div className="p-4 h-[200vh]">
      <h2 className="leading-tight text-[clamp(1.75rem,calc(1rem+6vw),5rem)]">
        Work
      </h2>
      <p className="text-sm opacity-90 mb-4">Recent projects</p>
    </div>
  );
}
