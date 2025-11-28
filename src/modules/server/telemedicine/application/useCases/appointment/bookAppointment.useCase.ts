import { getTelemedicineInjection } from "../../../di/container";
import {
  TBookAppointmentUseCase,
  TAppointment,
} from "../../../../../shared/entities/models/telemedicine/appointment";

const generateRoomId = () =>
  `room_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

export async function bookAppointmentUseCase(
  createData: TBookAppointmentUseCase
): Promise<TAppointment> {
  const appointmentRepository = getTelemedicineInjection(
    "IAppointmentRepository"
  );
  const idResolverRepository = getTelemedicineInjection(
    "IIdResolverRepository"
  );
  const doctorServiceRepository = getTelemedicineInjection(
    "IDoctorServiceRepository"
  );

  const { patientUserId, doctorUserId, serviceId, ...rest } = createData;

  const doctorId = await idResolverRepository.resolveDoctorIdByUserIdAndOrgId(
    doctorUserId,
    rest.orgId
  );

  const patientId = await idResolverRepository.resolvePatientIdByUserIdAndOrgId(
    patientUserId,
    rest.orgId
  );

  if (!doctorId) {
    throw new Error("Doctor not found");
  }

  if (!patientId) {
    throw new Error("Patient not found");
  }

  let virtualRoomId: string | null = null;

  if (rest.appointmentMode === "VIRTUAL") {
    virtualRoomId = generateRoomId();
  }

  const service = await doctorServiceRepository.getDoctorServiceByIds(
    serviceId,
    doctorId,
    rest.orgId
  );

  if (!service) {
    throw new Error("Service not found");
  }

  const data = await appointmentRepository.bookAppointment({
    ...rest,
    doctorId,
    patientId,
    virtualRoomId,
    status: "PENDING",
    type: service.name,
    price: service.priceAmount,
    priceCurrency: service.priceCurrency,
  });

  return data;
}
