import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Header from "@/app/components/header";
import Banner from "@/app/components/banner";
import About from "@/app/components/about";
import Projects from "@/app/components/projects";
import Contact from "@/app/components/contact";
import Footer from "@/app/components/footer";

import BlurFade from "@/components/magicui/blur-fade";

export default function Home() {
  const delay = 0.2;
  return (
    <main>
      <BlurFade delay={delay} inView>
        <Header />
      </BlurFade>
      <BlurFade delay={delay} inView>
        <Banner />
      </BlurFade>
      <BlurFade delay={delay} inView>
        <About />
      </BlurFade>
      <BlurFade delay={delay} inView>
        <Projects />
      </BlurFade>
      <BlurFade delay={delay} inView>
        <Contact />
      </BlurFade>
      <Footer />
    </main>
  );
}
