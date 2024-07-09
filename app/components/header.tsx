import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <header className="mb-4 p-4 rounded-xl shadow-xl flex w-full justify-between items-center">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      {/* <span className="flex-end">
        <Button>Learn More</Button>
      </span> */}
    </header>
  );
}
