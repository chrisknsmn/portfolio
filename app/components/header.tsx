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
    <header>
      <Card>
        <CardHeader>
          <div className="flex w-full justify-between items-center">
            <Logo className="h-[40px] w-[40px]" />
            <span className="flex-end">
              {/* <Link href="/#contact" className="mr-2">
                <Button>Resume</Button>
              </Link> */}
              <Link href="/#contact">
                <Button>Contact</Button>
              </Link>
            </span>
          </div>
        </CardHeader>
      </Card>
    </header>
  );
}
