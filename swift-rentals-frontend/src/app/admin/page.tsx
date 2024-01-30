import Link from "next/link"

export default function AdminHome() {
    const cards = [
        { value: 'cars', label: 'Cars' },
        { value: 'admin', label: 'Admin' }
    ]
    return (
        <main className="h-screen w-full bg-[#f1f1fc]">
            <div className="container mx-auto md:max-w-[1050px] py-5">
                <h1 className="text-3xl mb-5">Welcome to Admin Page</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {cards.map((item) =>
                        <Link href={`/admin/${item.value}`}>
                            <div className="bg-white shadow-md p-5 rounded-lg">
                                {item.label}
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </main>
    )
}