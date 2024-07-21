import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import profilePic from "@/public/profile.jpeg";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const skills = [
  {
    title: "Frontend",
    items: ["React", "Vue", "JavaScript", "TypeScript"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Next.js", "MongoDB", "SQL"],
  },
  {
    title: "Design",
    items: ["Tailwind", "Bootstrap", "Figma", "Adobe"],
  },
  {
    title: "Tools",
    items: ["Git", "Docker", "Kubernetes"],
  },
];

export default function About() {
  return (
    <>
      <div className="block md:hidden mb-4">
        <div className="max-w-[250px] w-full p-2 border shadow rounded-md text-left">
          <Image
            src={profilePic}
            alt="Profile Picture"
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-full md:w-[78%]">
          <Card className="h-full flex items-center">
            <CardContent>
              <CardTitle>About</CardTitle>
              <p className="mt-2 max-w-[800px] text-sm text-muted-foreground">
                Accomplished Full Stack Engineer experienced in JavaScript,
                TypeScript, React, Next.js, and Vue. Proven ability to engineer
                applications for industry leaders including Fidelity and RBC.
                Skilled in implementing responsive design, managing version
                control, enhancing SEO, and optimizing through effective unit
                testing.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="w-[25%] hidden md:block">
          <div className="w-full h-full text-center items-center">
            <div className="flex w-full h-full mx-auto p-2 border shadow rounded-md text-center items-center">
              <Image
                src={profilePic}
                alt="Profile Picture"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-x-4 hidden md:flex">
        {skills.map((skill, index) => (
          <div key={index} className="w-1/4">
            <Card className="h-full">
              <CardContent>
                <CardDescription>{skill.title}</CardDescription>
                <div className="flex flex-wrap mr-4">
                  {skill.items.map((item, index) => (
                    <Badge key={index} className="mr-2 mt-2">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-4 space-x-4 block md:hidden">
        <div className="w-full">
          <Card className="h-full">
            <CardContent>
              <CardTitle>Skills</CardTitle>
              <div className="flex flex-wrap mr-4 mt-2">
                {skills.map((skill, index) => (
                  <>
                    {skill.items.map((item, index) => (
                      <Badge key={index} className="mr-2 mt-2">
                        {item}
                      </Badge>
                    ))}
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <BentoGrid>
        <BentoCard span={3}></BentoCard>
        <div className="hidden md:block">
          <BentoCard span={1}>
            <div className="w-full text-center items-center">
              <div className="w-full h-auto mx-auto p-2 border shadow rounded-md text-center">
                <Image
                  src={profilePic}
                  alt="Profile Picture"
                  className="rounded-md"
                />
              </div>
            </div>
          </BentoCard>
        </div>

        {skills.map((skill, index) => (
          <div key={index} className="hidden md:block">
            <BentoCard span={1}>
              <Card className="h-full">
                <CardContent>
                  <CardDescription>{skill.title}</CardDescription>
                  <div className="flex flex-wrap mr-4">
                    {skill.items.map((item, index) => (
                      <Badge key={index} className="mr-2 mt-2">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BentoCard>
          </div>
        ))}

        <div className="block md:hidden">
          <BentoCard span={1}>
            <Card className="h-full">
              <CardContent>
                <CardTitle>Skills</CardTitle>
                {skills.map((skill, index) => (
                  <>
                    {skill.items.map((item, index) => (
                      <Badge key={index} className="mr-2 mt-2">
                        {item}
                      </Badge>
                    ))}
                  </>
                ))}
              </CardContent>
            </Card>
          </BentoCard>
        </div>
      </BentoGrid> */}
    </>
  );
}
