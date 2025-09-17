import Banner from "./components/banner";
import Work from "./components/work";
import Nav from "./components/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="p-4 flex flex-col gap-48">
        <Banner />
        <Work />
      </main>
    </>
  );
}
