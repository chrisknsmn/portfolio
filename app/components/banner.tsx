import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="rounded-xl shadow-xl p-8 py-24 flex w-full justify-between items-center">
      <div>
        <h1 className="md:text-6xl text-4xl font-bold">Chris Kinsman</h1>
        <h2 className="text-2xl font-regular mb-4 mt-2">Engineering the Web</h2>
        {/* <Button>Learn More</Button> */}
      </div>
      <div className="hidden md:block w-full md:w-1/2 text-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="px-8 mx-auto w-auto h-full max-h-[150px]"
        />
      </div>
    </div>
  );
}
