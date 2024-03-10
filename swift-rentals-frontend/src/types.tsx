export type Car = {
    _id: string;
    make: string;
    model: string;
    manufacturing_year: string;
    is_available: string;
    price: string;
    images: any;
    description: string;
    location: string;
    Features: Feature[];
};

export type Feature = {
    _id: string;
    icon: string;
    name: string;
}
