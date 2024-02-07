import Image from "next/image";
import Hero from "./components/Hero/Hero";

export default function Home() {
  return (
    <main className="min-min-h-screen w-ful">
      <section className="flex">
        <div className="w-1/2 min-h-screen flex place-content-center mt-32">
          <div className="w-[80%] h-[60%] relative">
            <h1 className="text-6xl font-semibold">
              Discover the Freedom of roads with
              <span className="text-blue-600"> SwiftRentals</span>
            </h1>
            <Image
              className="absolute right-20 top-40"
              src={`/images/stroke.png`}
              alt="stroke under swift rental"
              width={400}
              height={100}
            />
            <p className="mt-14 text-gray-400">
              every journey should be an unforgettable adventure. Whether
              you&apos;re embarking on a business trip, a family vacation, or a
              weekend getaway, we&apos;ve got the perfect wheels to elevate your
              experience.
            </p>
            <div className="mx-4 my-6">
              <button className="bg-blue-500 rounded-xl text-white p-3 m-2 font-bold hover:opacity-80 transition-opacity ">
                Explore our Cars
              </button>
              <button className="bg-blue-200 rounded-xl text-blue-500 font-bold py-3 px-5 m-2 hover:opacity-80 transition-opacity">
                Find out More!
              </button>
            </div>
          </div>
        </div>
        <Hero />
      </section>
    </main>
  );
}
