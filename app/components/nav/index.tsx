import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <header className="sticky top-4 inset-x-0 z-50 mx-4 mb-4">
      <div className="mx-auto max-w-screen-lg flex items-center justify-between justify-end">
        {/* <Link href="/">
          <div className="aspect-square h-12 rounded-full bg-white/10 hover:bg-gray-900/10 transition-colors duration-500 ease-in-out backdrop-blur-sm flex items-center justify-center cursor-pointer">
            <Image src="/logo.svg" alt="Logo" width={28} height={28} />
          </div>
        </Link> */}
        <Link href="/">
          <div className="aspect-square h-12 rounded-full bg-white/10 hover:bg-gray-900/10 transition-colors duration-500 ease-in-out backdrop-blur-sm flex items-center justify-center cursor-pointer text-2xl">
            &#8984;
          </div>
        </Link>
      </div>
    </header>
  );
}
