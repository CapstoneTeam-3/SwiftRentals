import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-1/2 min-h-screen relative">
      <Image
        className="absolute bottom-32 right-72"
        src={`/images/payment.png`}
        width={220}
        height={220}
        alt="hero payment image"
      />
      <Image
        className="absolute top-12 left-1/2"
        src={`/images/payment.png`}
        width={220}
        height={220}
        alt="hero payment image"
      />
      <Image
        className="absolute m-3 top-32 left-1/4"
        src={`/images/profile.png`}
        width={140}
        height={140}
        alt="hero payment image"
      />
      <Image
        className="absolute m-3 bottom-48 right-20"
        src={`/images/profile.png`}
        width={140}
        height={140}
        alt="hero payment image"
      />
    </div>
  );
}
