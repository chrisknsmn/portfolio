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
import { Logo } from "@/public/logo";

export default function Home() {
  return (
    <header className="mb-4">
      <Card>
        <CardHeader className="p-4">
          <div className="flex w-full justify-between items-center">
            <Logo className="h-[40px] w-[40px]" />
            {/* <span className="flex-end">
              <Button>Email</Button>
            </span> */}
          </div>
        </CardHeader>
      </Card>
    </header>
  );
}
