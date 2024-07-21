import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/public/icons";

const projects = [
  {
    title: "412 Studios",
    description:
      "Fullstack Ecommerce website featuring dynamic one time and reacurring payment options.",
    image: "/images/412.jpg",
    tags: ["Next.js", "Typescript", "Tailwind", "Supabase", "Figma"],
    links: [
      {
        title: "Website",
        icon: <Icons.globe className="h-4 w-4" />,
        link: "https://www.412studios.ca/",
      },
      {
        title: "Source",
        icon: <Icons.github className="h-4 w-4" />,
        link: "https://github.com/412studios/412studios/settings",
      },
      {
        title: "Figma",
        icon: <Icons.figma className="h-4 w-4" />,
        link: "https://www.figma.com/design/RiXq8HLXsy3trljJIQge6R/412-Studios?node-id=280-122&t=2iUpmRT49rv374cY-1",
      },
    ],
  },
  {
    title: "Fidelity Careers",
    description:
      "Fidelity Careers website using React, JavaScript, and Bootstrap, featuring an intuitive interface and seamless navigation",
    image: "/images/fidelity.jpg",
    tags: ["React", "Javascript", "Bootstrap", "CSS"],
    links: [
      {
        title: "Website",
        icon: <Icons.globe className="h-4 w-4" />,
        link: "https://careers.fidelity.ca/en/index/",
      },
    ],
  },
  {
    title: "RBC Avion Rewards",
    description:
      "Developed the Avion Rewards website using React, JavaScript, and Bootstrap, featuring a user-friendly interface and seamless navigation to explore and manage rewards programs.",
    image: "/images/avion.jpg",
    tags: ["React", "Javascript", "Bootstrap", "CSS"],
    links: [
      {
        title: "Website",
        icon: <Icons.globe className="h-4 w-4" />,
        link: "https://www.avionrewards.com/index.html",
      },
    ],
  },
];

export default function Projects() {
  return (
    <div className="my-24">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>
            Take a look at some of my recent work!
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: projects.length }).map((_, index) => (
                <CarouselItem key={index} className="flex mb-8">
                  <div className="mr-4 mb-4 flex flex-col h-full">
                    <Image
                      src={projects[index].image}
                      alt={projects[index].title}
                      height={720}
                      width={1280}
                      className="w-full rounded-lg"
                    />
                    <div className="flex-grow flex flex-col mt-4">
                      <CardTitle className="text-4xl">
                        {projects[index].title}
                      </CardTitle>
                      <CardDescription className="mt-4 pr-2 flex-grow">
                        {projects[index].description}
                      </CardDescription>
                    </div>
                    <div className="mt-auto">
                      <div className="flex flex-wrap mt-4">
                        {projects[index].tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="mr-2 mt-2"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap mt-4">
                        {projects[index].links.map((link, linkIndex) => (
                          <Link
                            href={link.link}
                            key={linkIndex}
                            target="_blank"
                          >
                            <Button
                              key={linkIndex}
                              className="mr-2 mt-2 flex justify-center items-center"
                            >
                              <span className="mr-2">{link.icon}</span>
                              <span>{link.title}</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
}
