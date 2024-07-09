import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Header from "@/app/components/header";
import Banner from "@/app/components/banner";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Banner />

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Hi, I am Christopher Kinsman</CardTitle>
            {/* <CardDescription>Hi, I'm Christopher Kinsman</CardDescription> */}
          </CardHeader>
          <CardContent>
            As an accomplished Web Developer, I specialize in creating
            responsive and high-performance web applications for industry
            leaders such as Fidelity, RBC, and Reliance. My expertise spans
            across various modern technologies including JavaScript, React,
            Angular, and Vue, allowing me to deliver solutions that not only
            meet but exceed client expectations.
          </CardContent>
          {/* <CardFooter>Footer</CardFooter> */}
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>What I Do</CardTitle>
            {/* <CardDescription>Hi, I'm Christopher Kinsman</CardDescription> */}
          </CardHeader>
          <CardContent>
            <CardTitle>Frontend Development</CardTitle>
            <CardDescription>
              Crafting seamless and interactive user interfaces with HTML, CSS,
              JavaScript, jQuery, React, Angular, and Vue.
            </CardDescription>

            <CardTitle className="mt-4">Backend Development</CardTitle>
            <CardDescription>
              Building robust and scalable server-side applications using
              Node.js.
            </CardDescription>

            <CardTitle className="mt-4">DevOps and Version Control</CardTitle>
            <CardDescription>
              Ensuring efficient development workflows with Git and Docker.
            </CardDescription>

            <CardTitle className="mt-4">Content Management</CardTitle>
            <CardDescription>
              Developing dynamic and user-friendly websites using WordPress.
            </CardDescription>

            <CardTitle className="mt-4">Design and Prototyping</CardTitle>
            <CardDescription>
              Creating visually compelling designs with Adobe Creative Suite,
              Figma, and Sketch.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            {/* <CardDescription>Hi, I'm Christopher Kinsman</CardDescription> */}
          </CardHeader>
          <CardContent>
            With a background in Integrated Media from OCAD University and a
            Full-Stack Web Development certification from Humber College, I
            blend creative design with technical expertise. My journey in web
            development is driven by a passion for solving complex problems with
            innovative solutions.
          </CardContent>
          {/* <CardFooter>Footer</CardFooter> */}
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Connect</CardTitle>
            {/* <CardDescription>Hi, I'm Christopher Kinsman</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div>
              Feel free to reach out to discuss potential collaborations or to
              learn more about my work.
              <br />
              <a href="mailto:chrisknsmn@gmail.com">
                Email: chrisknsmn@gmail.com
              </a>
              <br />
              Phone: <a href="tel:+16475002475">(647) 500-2475</a>
            </div>
          </CardContent>
          {/* <CardFooter>Footer</CardFooter> */}
        </Card>
      </div>

      <Footer />
    </main>
  );
}
