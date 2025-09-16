import Banner from "./components/banner";
import Work from "./components/work";
export default function Home() {
  return (
    <div className="font-sans">
      <main className="max-w-screen-md m-auto flex flex-col gap-4">
        <Banner />
        <Work />
      </main>
    </div>
  );
}
