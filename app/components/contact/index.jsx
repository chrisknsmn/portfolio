import { H2, H3, H4, P } from "@/components/ui/main";
import Link from "next/link";
import { menuSections } from "@/app/lib/menu-data";

export default function Contact() {
  const resourcesSection = menuSections.find(section => section.title === "Resources");
  const socialSection = menuSections.find(section => section.title === "Social");

  return (
    <div className="p-4">
      <H2 id="contact" variant="border">
        Contact
      </H2>
      <div className="pt-8 space-y-6">
        {resourcesSection && (
          <div>
            <H3 className="mb-3">{resourcesSection.title}</H3>
            <div className="border flex flex-col">
              {resourcesSection.items.map((item, index) => (
                <div key={index} className="px-2 py-1">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {socialSection && (
          <div>
            <H3 className="mb-3">{socialSection.title}</H3>
            <div className="border flex flex-col">
              {socialSection.items.map((item, index) => (
                <div key={index} className={`px-2 py-1 ${index < socialSection.items.length - 1 ? 'border-b' : ''}`}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
