export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string; // e.g., "Dentist", "Cardiologist"
  subSpecialty?: string; // e.g., "Root Canal Expert"
  rating: number;
  location: string;
  phone: string;
  image: string;
  description: string;
  available: boolean;
  reviews: Review[];
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  supportedModes: ("VIRTUAL" | "INPERSON")[];
}

export interface TimeSlot {
  time: string; // "09:00"
  available: boolean;
}

export interface DateOption {
  date: Date;
  isAvailable: boolean;
}

export interface AppointmentDetails {
  doctor: Doctor | null;
  service: Service | null;
  date: Date | null;
  time: string | null;
}
