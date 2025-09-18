import Image from "next/image";

export default function Experience() {
  return (
    <div className="p-4">
      <h2 className="leading-tight text-[clamp(1.75rem,calc(1rem+6vw),5rem)] border-b pb-2">
        Expereince
      </h2>
      <p className="text-sm my-4">
        Front-End & Full-Stack Web Developer | 6+ YOE Delivering Scalable,
        User-Centered Apps for Enterprise & Modern Web (RBC, Fidelity) | React,
        Next.js, TypeScript | Reliable, Detail-Driven, Outcome-Focused
      </p>
      <div className="mt-12 flex flex-col gap-12">
        {/* INTERAD */}
        <div className="flex flex-col gap-4">
          <div className="flex">
            <div className="flex items-center justfy-center mr-4">
              <div className="border aspect-square p-3 rounded-full w-12 flex items-center justify-center">
                <Image
                  src="/images/interad.svg"
                  alt="Interad Logo"
                  width="100"
                  height="100"
                  className="w-full h-auto m-auto"
                ></Image>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="leading-tight text-[clamp(1.75rem,calc(1rem+6vw),1rem)] font-semibold">
                Interad
              </h2>
              <p className="text-xs">Full-Stack Web Developer</p>
              <p className="text-xs">Aug 2021 - Sept 2025</p>
            </div>
          </div>
          {/* CARD LOWER */}
          <div className="flex">
            <div className="w-14 flex justify-center mr-3">
              <div className="pt-[6px]">
                <div className="h-full w-[1px] pt-[12px] bg-border"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <p>
                Present - Developed and maintained web applications using React,
                Angular, Vue, and WordPress.
              </p>
              <p>
                Exceeded client requirements for Fidelity and RBC serving over
                100,000 daily users.
              </p>
              <p>
                Collaborated with clients and project managers while
                implementing SEO strategies.
              </p>
              <p>
                Maintained meticulous documentation and version control using
                git while conducting unit testing.
              </p>
              <p>
                Built, tested and maintained dynamic user facing tools while
                delivering pixel-perfect design.
              </p>
            </div>
          </div>
        </div>
        {/* RELIANCE */}
        <div className="flex flex-col gap-4">
          <div className="flex">
            <div className="flex items-center justfy-center mr-4">
              <div className="border aspect-square p-3 rounded-full w-12 flex items-center justify-center">
                <Image
                  src="/images/reliance.svg"
                  alt="Interad Logo"
                  width="100"
                  height="100"
                  className="w-full h-auto m-auto"
                ></Image>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="leading-tight text-[clamp(1.75rem,calc(1rem+6vw),1rem)] font-semibold">
                Reliance
              </h2>
              <p className="text-xs">Front-End Web Developer</p>
              <p className="text-xs">Jan 2020 - Aug 2021</p>
            </div>
          </div>
          {/* CARD LOWER */}
          <div className="flex">
            <div className="w-14 flex justify-center mr-3">
              <div className="pt-[6px]">
                <div className="h-full w-[1px] pt-[12px] bg-border"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <p>
                Developed responsive cross-platform web applications using
                JavaScript, CSS, Vue, and React.
              </p>
              <p>
                Innovated user experience standards with Adobe and Figma while
                enhancing brand identity.
              </p>
              <p>
                Deployed dynamic web applications in a timely manner to exceed
                client expectations.
              </p>
              <p>
                Increased user retention through responsive design and
                accessible development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
