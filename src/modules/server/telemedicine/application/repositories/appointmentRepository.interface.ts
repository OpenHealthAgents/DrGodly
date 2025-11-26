import {
  TAppointment,
  TAppointments,
  TBookAppointment,
} from "../../../../shared/entities/models/telemedicine/appointment";

export interface IAppointmentRepository {
  getAppointmentsForPatient(
    patientId: string,
    orgId: string
  ): Promise<TAppointments>;
  getAppointmentsForDoctor(
    doctorId: string,
    orgId: string
  ): Promise<TAppointments>;
  bookAppointment(appointmentData: TBookAppointment): Promise<TAppointment>;
}
