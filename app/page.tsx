import Image from "next/image";
import Banner from "./components/banner";
export default function Home() {
  return (
    <div className="font-sans">
      {/* <header>Header</header> */}
      <main className="max-w-screen-lg m-auto p-4">
        {/* <main className="max-w-screen-lg border-4 border-rose-500 m-auto p-4"> */}
        <div className="flex flex-col gap-4">
          <Banner />  
        </div>
      </main>
      {/* <footer>Footer</footer> */}
    </div>
  );
}
