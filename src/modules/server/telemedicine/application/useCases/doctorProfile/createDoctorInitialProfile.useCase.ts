import { TDoctorInitialProfile } from "../../../../../shared/entities/models/telemedicine/doctorProfile";
import { getTelemedicineInjection } from "../../../di/container";

export async function createDoctorInitialProfileUseCase(
  orgId: string,
  createdBy: string
): Promise<TDoctorInitialProfile> {
  const doctorProfileRepository = getTelemedicineInjection(
    "IDoctorProfileRepository"
  );
  const data = await doctorProfileRepository.createDoctorInitialProfile(
    orgId,
    createdBy
  );
  return data;
}
