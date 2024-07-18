import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <Card className="mt-4 p-6">
      <CardTitle className="pb-4">About</CardTitle>
      <p className="pb-8 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Accomplished Full Stack Engineer experienced in JavaScript, TypeScript,
        React, Next.js, and Vue. Proven ability to engineer applications for
        industry leaders including Fidelity and RBC. Skilled in implementing
        responsive design, managing version control, enhancing SEO, and
        optimizing through effective unit testing.
      </p>
      <CardTitle className="pb-4">Skills</CardTitle>
      <div>
        <Badge className="mr-2 mb-2">JavaScript</Badge>
        <Badge className="mr-2 mb-2">TypeScript</Badge>
        <Badge className="mr-2 mb-2">Node.js</Badge>
        <Badge className="mr-2 mb-2">Next.js</Badge>
        <Badge className="mr-2 mb-2">Three.js</Badge>
        <Badge className="mr-2 mb-2">MongoDB</Badge>
        <Badge className="mr-2 mb-2">Supabase</Badge>
        <Badge className="mr-2 mb-2">Git</Badge>
        <Badge className="mr-2 mb-2">Figma</Badge>
      </div>
    </Card>
  );
}
