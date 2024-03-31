import Image from "next/image";
import Hero from "./components/Hero/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full">
      <section className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex place-content-center mt-0 mx-2 sm:mt-32">
          <div className="w-[80%] lg:w-[100%] m-10 h-[60%] relative">
            <h1 className="text-4xl sm:text-6xl font-semibold">
              Discover the Freedom of roads with
              <span className="text-blue-600 relative inline-block">
                SwiftRentals
                <Image
                  className="absolute right-0 bottom-[-40px] lg:right-auto lg:left-0"
                  src={`/images/stroke.png`}
                  alt="stroke under swift rental"
                  width={400}
                  height={100}
                />
              </span>
            </h1>
            <p className="mt-14 text-gray-400">
              every journey should be an unforgettable adventure. Whether
              you&apos;re embarking on a business trip, a family vacation, or a
              weekend getaway, we&apos;ve got the perfect wheels to elevate your
              experience.
            </p>
            <div className="mx-4 my-6">
              <Link
                href="/cars"
                className="bg-blue-500 rounded-xl text-white p-3 m-2 font-bold hover:opacity-80 transition-opacity "
              >
                Explore our Cars
              </Link>
              <Link
                href="/about"
                className="bg-blue-200 rounded-xl text-blue-500 font-bold py-3 px-5 m-2 hover:opacity-80 transition-opacity"
              >
                Find out More!
              </Link>
            </div>
          </div>
        </div>
        <Hero className="hidden lg:block" />
      </section>
    </main>
  );
}
