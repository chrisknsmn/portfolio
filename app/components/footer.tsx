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

export default function Footer() {
  return (
    <footer className="mt-4 p-4 rounded-xl bg-primary text-background text-center">
      &copy; Chris Kinsman {new Date().getFullYear()}
    </footer>
  );
}
