import { IDoctorProfileRepository } from "../application/repositories/doctorProfileRepository.interface";
import { IABDMService } from "../application/services/abdmService.interface";

export const DI_SYMBOLS = {
  // Repositorys
  IDoctorProfileRepository: Symbol.for("IDoctorProfileRepository"),

  // Services
  IABDMService: Symbol.for("IABDMService"),
};

export interface DI_RETURN_TYPES {
  // Repositorys
  IDoctorProfileRepository: IDoctorProfileRepository;
  IABDMService: IABDMService;
}
