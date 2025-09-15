"use client";
import { Section } from "@/components/ui/main";
export default function Work() {
  return (
    <Section>
      <div>
        <h2 className="text-4xl font-bold text-black">Work</h2>
      </div>
      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Featured projects and professional experience showcasing full-stack development,
          user experience design, and technical problem-solving.
        </p>
      </div>
    </Section>
  );
}