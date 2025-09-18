import { H2, H3, H4, P } from "@/components/ui/main";
import Link from "next/link";
export default function Contact() {
  return (
    <div className="p-4">
      <H2 variant="border">Contact</H2>
      <div className="pt-8">
        <P>
          <Link href="https://www.linkedin.com/in/chrisknsmn/">LinkedIn</Link>
        </P>
        <P>
          <Link href="https://github.com/chrisknsmn">GitHub</Link>
        </P>
      </div>
    </div>
  );
}
