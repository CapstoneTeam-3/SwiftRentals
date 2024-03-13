import Image from "next/image";

export default function Hero({ className }: { className: string | undefined }) {
  return (
    <div className={`${className} w-1/2 h-screen relative`}>
      <Image
        className="absolute m-3 top-40 left-32 z-20"
        src={`/images/profile.png`}
        width={140}
        height={140}
        alt="hero profile image"
      />
      <Image
        className="absolute top-12 left-80"
        src={`/images/chat.png`}
        width={140}
        height={140}
        alt="hero chat image"
      />

      <Image
        className="absolute m-3 bottom-48 z-10 right-14"
        src={`/images/payment.png`}
        width={240}
        height={200}
        alt="hero payment image"
      />
      <Image
        className="absolute bottom-28 left-72"
        src={`/images/success.png`}
        width={140}
        height={220}
        alt="hero success image"
      />
    </div>
  );
}
