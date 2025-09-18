import { H2, H3, H4, P } from "@/components/ui/main";
import Link from "next/link";
export default function Contact() {
  return (
    <div className="p-4">
      <H2 variant="border">Contact</H2>
      <div className="pt-8">
        <div className="border flex flex-col">
          <div className="border-b px-2">
            <Link
              href="https://www.linkedin.com/in/chrisknsmn/"
              target="_blank"
            >
              LinkedIn
            </Link>
          </div>
          <div className="px-2">
            <Link href="https://github.com/chrisknsmn" target="_blank">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
