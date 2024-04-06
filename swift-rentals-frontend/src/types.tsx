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

export interface RegisterData {
  email?: string | null;
  password?: string | null;
  name: string | null;
  confirmPassword: string | null;
  dob: string | null;
  role: string | null;
}

export interface Chat {
  [x: string]: any;
  _id: string;
  user: { _id: string; name: string; email: string };
}
export interface Message {
  _id?: string;
  chatListId: string;
  sender_user: string;
  receiver_user: string;
  content: string;
}

export interface ChatTabProps {
  sender: string | null;
  chat: {
    chatId: string;
    reciever: string;
  };
}

export type Feature = {
  _id: string;
  icon: string;
  name: string;
};

export type Booking = {
  _id: string;
  start_date: string;
  end_date: string;
  is_booked: string;
  User: string;
  Car: Car;
  createdAt: string;
  __v: number;
};
