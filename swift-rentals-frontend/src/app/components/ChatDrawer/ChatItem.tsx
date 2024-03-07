import Image from "next/image";

export function ChatItem({
  name,
  date,
  href,
}: {
  name: string;
  date: string;
  href: string;
}) {
  return (
    <div className="flex border-b p-2">
      <Image
        className="rounded-full mr-4 h-10 object-center"
        src={href}
        alt="main logo of swift rentals"
        width={40}
        height={40}
      />
      <div>
        <span>{name}</span>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
    </div>
  );
}
