import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/public/logo";
import profilePic from "@/public/profile.jpeg";

export default function Banner() {
  return (
    <div className="p-8 py-24 flex w-full justify-between items-center">
      <div className="lg:w-1/2 w-full">
        <h1 className="md:text-6xl text-6xl font-bold mb-8">
          Hi, I&#39;m Chris{" "}
          <span className="whitespace-nowrap">Kinsman 🚀</span>
        </h1>
        <h2 className="text-2xl font-regular mb-4 mt-2">
          Full Stack Engineer and Entrepreneur. Passionate about building
          innovative solutions and helping businesses grow.
        </h2>
      </div>
      <div className="hidden lg:block w-full sm:w-1/2 text-center p-4 items-center">
        <div className="max-w-[300px] w-full h-auto mx-auto p-2 border shadow rounded-md text-center">
          <Image
            src={profilePic}
            alt="Profile Picture"
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
