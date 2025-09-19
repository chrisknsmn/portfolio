import { H2, H3, H4, P } from "@/components/ui/main";
import Link from "next/link";
import { menuSections } from "@/app/lib/menu-data";

export default function Contact() {
  const resourcesSection = menuSections.find(
    (section) => section.title === "Resources"
  );
  const socialSection = menuSections.find(
    (section) => section.title === "Social"
  );

  return (
    <div className="p-4">
      <H2 id="contact">Contact</H2>
      <div>
        <div className="border flex flex-col">
          <div className="border-b px-2 font-bold">Resources</div>
          {resourcesSection &&
            resourcesSection.items.map((item, index) => (
              <div
                key={`resources-${index}`}
                className="border-b px-2 hover:underline"
              >
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          <div className="border-b px-2 font-bold">Social</div>
          {socialSection &&
            socialSection.items.map((item, index) => (
              <div
                key={`social-${index}`}
                className={`px-2 hover:underline ${
                  index < socialSection.items.length - 1 ? "border-b" : ""
                }`}
              >
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
