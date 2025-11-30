import { TAppointments } from "@/modules/shared/entities/models/telemedicine/appointment";
import { TSharedUser } from "@/modules/shared/types";
import { ZSAError } from "zsa";

export interface IAppointmentTableProps {
  appointments: TAppointments | null;
  error: ZSAError | null;
  user: TSharedUser;
}

export type TAppointmentStatue =
  | "PENDING"
  | "SCHEDULED"
  | "CANCELLED"
  | "COMPLETED"
  | "INPROGRESS";
