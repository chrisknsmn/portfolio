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
      "Fullstack Ecommerce website feasturing dynamic one time and reacurring payment options.",
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
      "Developed the Fidelity Careers website using React, JavaScript, and Bootstrap, featuring an intuitive interface and seamless navigation to explore career opportunities.",
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
    <Card className="my-12 p-6">
      <CardTitle className="pb-4">Projects</CardTitle>
      <div className="items-center px-[64px]">
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: projects.length }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="p-4 flex-col">
                    <div>
                      <div className="w-full h-[200px] overflow-hidden border rounded-md mb-4">
                        <Image
                          alt={projects[index].title}
                          src={projects[index].image}
                          width={1200}
                          height={550}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                      <CardTitle>{projects[index].title}</CardTitle>
                      <CardDescription className="mt-4 max-w-[400px] min-h-[60px]">
                        {projects[index].description}
                      </CardDescription>
                      <div className="flex flex-wrap mt-4">
                        {projects[index].tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="mr-2 mt-2"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap mt-4">
                        {projects[index].links.map((link, index) => (
                          <Link href={link.link} key={index} target="_blank">
                            <Button
                              key={index}
                              className="mr-2 mt-2 flex justify-center items-center"
                            >
                              <span className="mr-2">{link.icon}</span>
                              <span>{link.title}</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Card>
  );
}
