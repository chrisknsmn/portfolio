import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/public/logo";
import Image from "next/image";
import profilePic from "@/public/profile.jpeg";

export default function Banner() {
  return (
    <div className="py-24 flex w-full justify-between items-center">
      <div className="w-full pl-6">
        <h1 className="md:text-8xl text-6xl font-bold mb-8">
          Chris <span className="whitespace-nowrap">Kinsman 🚀</span>
        </h1>
        <h2 className="text-2xl font-regular mb-4 mt-2 max-w-[500px]">
          Full Stack Engineer and Entrepreneur. Passionate about building
          innovative solutions and helping businesses grow.
        </h2>
      </div>
    </div>
  );
}
