import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className=" min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-semibold text-blue-600 mb-8">
            About SwiftRentals
          </h1>
          <p className="text-gray-600 mb-8">
            At SwiftRentals, we believe that every journey should be an
            unforgettable adventure. With a passion for exploration and a
            commitment to exceptional service, we provide our customers with the
            perfect wheels to elevate their travel experiences.
          </p>
          <p className="text-gray-600 mb-8">
            Whether you&#39;re embarking on a business trip, a family vacation,
            or a weekend getaway, we&#39;re here to make your travel dreams a
            reality. From sleek sedans to spacious SUVs, our diverse fleet of
            vehicles ensures that you&#39;ll find the perfect ride for any
            occasion.
          </p>
          <div className="flex justify-center">
            <Link
              href="/cars"
              className="bg-blue-500 rounded-xl text-white px-8 py-4 font-bold hover:opacity-80 transition-opacity mr-4"
            >
              Explore Our Cars
            </Link>
            <Link
              href="/"
              className="bg-blue-200 rounded-xl text-blue-500 px-8 py-4 font-bold hover:opacity-80 transition-opacity"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
