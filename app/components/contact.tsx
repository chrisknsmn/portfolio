import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/public/icons";

const links = [
  {
    title: "github",
    icon: <Icons.github />,
    href: "https://github.com/chrisknsmn",
  },
  {
    title: "linkedin",
    icon: <Icons.linkedin />,
    href: "https://www.linkedin.com/in/chrisknsmn/",
  },
  {
    title: "x",
    icon: <Icons.x />,
    href: "https://twitter.com/chrisknsmn",
  },
  {
    title: "email",
    icon: <Icons.email className="h-6 w-6" />,
    href: "mailto:chrisknsmn@gmail.com",
  },
];

export default function Contact() {
  return (
    <Card id="contact">
      <CardTitle className="pb-4">Contact</CardTitle>
      <p className="text-2xl font-regular mt-2">
        Want to chat? Feel free to Email me and schedule a call.
      </p>

      <div className="flex flex-wrap">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.title}
            className="mr-4 mt-4"
            target="_blank"
          >
            <Button className="flex items-center justify-centerus space-x-2 text-primary hover:underline py-6">
              <span className="h-6 w-6 text-background">{link.icon}</span>
              <span className="text-background">{link.title}</span>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
}
