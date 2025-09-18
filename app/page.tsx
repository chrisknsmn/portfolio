import Nav from "./components/nav";
import Banner from "./components/banner";
import Projects from "./components/projects";
import Experience from "./components/experience";
import Contact from "./components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="p-4 flex flex-col gap-48">
        <Banner />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
