import { TAppointments } from "@/modules/shared/entities/models/telemedicine/appointment";
import { getTelemedicineInjection } from "../../../di/container";

export async function getAppointmentsForDoctorUseCase(
  userId: string,
  orgId: string
): Promise<TAppointments> {
  const appointmentRepository = getTelemedicineInjection(
    "IAppointmentRepository"
  );
  const doctorProfileRepository = getTelemedicineInjection(
    "IDoctorProfileRepository"
  );

  const doctorProfile =
    await doctorProfileRepository.getDoctorInitialProfileByUniqueFields(
      orgId,
      userId
    );

  if (!doctorProfile) {
    throw new Error("Doctor not found");
  }

  const data = await appointmentRepository.getAppointmentsForDoctor(
    doctorProfile.id,
    orgId
  );

  return data;
}
