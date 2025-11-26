import { TAppointments } from "@/modules/shared/entities/models/telemedicine/appointment";
import { getTelemedicineInjection } from "../../../di/container";

export async function getAppointmentsForPatientUseCase(
  userId: string,
  orgId: string
): Promise<TAppointments> {
  const appointmentRepository = getTelemedicineInjection(
    "IAppointmentRepository"
  );
  const patientProfileRepository = getTelemedicineInjection(
    "IPatientProfileRepository"
  );

  const patientProfile =
    await patientProfileRepository.getPatientWithPersonalProfile(orgId, userId);

  if (!patientProfile) {
    throw new Error("Patient not found");
  }

  const data = await appointmentRepository.getAppointmentsForPatient(
    patientProfile.id,
    orgId
  );

  return data;
}
