import Image from "next/image";
import { H2, H3, H4, P } from "@/components/ui/main";
import { ExperienceCard } from "@/components/ui/experience";

export default function Experience() {
  return (
    <div className="p-4">
      <H2 id="experience" className="mb-2">
        Expereince
      </H2>
      <div className="flex flex-col gap-4">
        <H3 variant="border" size="h3">
          Work
        </H3>
        {/* INTERAD */}
        <ExperienceCard
          company="Interad"
          role="Full-Stack Web Developer"
          dates="Aug 2021 – Sept 2025"
          logoSrc="/images/interad.svg"
        >
          <P>
            Developed and maintained web apps using React, Angular, Vue, and
            WordPress.
          </P>
          <P>
            Exceeded client requirements for Fidelity and RBC serving 100,000+
            daily users.
          </P>
          <P>
            Collaborated with clients and PMs while implementing SEO strategies.
          </P>
          <P>
            Maintained documentation and version control with git; conducted
            unit testing.
          </P>
          <P>
            Built, tested, and maintained user-facing tools with pixel-perfect
            design delivery.
          </P>
        </ExperienceCard>
        {/* RELIANCE */}
        <ExperienceCard
          company="Reliance"
          role="Front-End Web Developer"
          dates="Jan 2020 - Aug 2021"
          logoSrc="/images/reliance.svg"
        >
          <P>
            Developed responsive cross-platform web applications using
            JavaScript, CSS, Vue, and React.
          </P>
          <P>
            Innovated user experience standards with Adobe and Figma while
            enhancing brand identity.
          </P>
          <P>
            Deployed dynamic web applications in a timely manner to exceed
            client expectations.
          </P>
          <P>
            Increased user retention through responsive design and accessible
            development.
          </P>
        </ExperienceCard>
        <H3 variant="border" size="h3">
          Education
        </H3>
        {/* HUMBER */}
        <ExperienceCard
          company="Humber"
          role="Web Development"
          dates="2019 - 2020"
          logoSrc="/images/humber.svg"
        >
          <P>
            Full-Stack Web Development program featuring database design, web
            application development, user experience implementation and
            accessibility standards including ASP.NET, Node.js, React, Python
            and other methods of web development.
          </P>
        </ExperienceCard>
        {/* OCADU */}
        <ExperienceCard
          company="OCAD U"
          role="Integrated Media"
          dates="2015 - 2019"
          logoSrc="/images/ocadu.svg"
        >
          <P>
            Comprehensive media program spanning graphic design, user
            experience, animation, and web development.
          </P>
        </ExperienceCard>
      </div>
    </div>
  );
}
