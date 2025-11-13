import { IDoctorProfileRepository } from "../application/repositories/doctorProfileRepository.interface";

export const DI_SYMBOLS = {
  // Repositorys
  IDoctorProfileRepository: Symbol.for("IDoctorProfileRepository"),
};

export interface DI_RETURN_TYPES {
  // Repositorys
  IDoctorProfileRepository: IDoctorProfileRepository;
}
