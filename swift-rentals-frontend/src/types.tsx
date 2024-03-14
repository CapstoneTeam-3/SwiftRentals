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
    ratings: {
        average: Number;
        count: Number;
    };
};

export type Feature = {
    _id: string;
    icon: string;
    name: string;
}

export type Booking = {
    _id: string;
    start_date: string;
    end_date: string; 
    is_booked: string;
    User: string;
    Car: Car;
    createdAt: string;
    __v: number;
}

