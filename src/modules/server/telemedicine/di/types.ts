import { IDoctorProfileRepository } from "../application/repositories/doctorProfileRepository.interface";
import { IPatientProfileRepository } from "../application/repositories/patientProfileRepository.interface";
import { IABDMService } from "../application/services/abdmService.interface";

export const DI_SYMBOLS = {
  // Repositories
  IDoctorProfileRepository: Symbol.for("IDoctorProfileRepository"),
  IPatientProfileRepository: Symbol.for("IPatientProfileRepository"),

  // Services
  IABDMService: Symbol.for("IABDMService"),
};

export interface DI_RETURN_TYPES {
  // Repositories
  IDoctorProfileRepository: IDoctorProfileRepository;
  IPatientProfileRepository: IPatientProfileRepository;

  // Services
  IABDMService: IABDMService;
}
