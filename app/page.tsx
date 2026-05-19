import Nav from "./components/nav";
import Banner from "./components/banner";
import Projects from "./components/projects";
import Experience from "./components/experience";
import Contact from "./components/contact";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="p-4 flex flex-col gap-24">
        <div id="banner" className="scroll-mt-24">
          <Banner />
        </div>
        <div id="projects" className="scroll-mt-24">
          <Projects />
        </div>
        <div id="experience" className="scroll-mt-24">
          <Experience />
        </div>
        <div id="contact" className="scroll-mt-24">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
