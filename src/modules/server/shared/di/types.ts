import { IUserRepository } from "../user/application/repositories/userRepository.interface";
import { IUserPreferencesRepository } from "../userPreferences/application/repositories/userPreferencesRepository.interface";

export const DI_SYMBOLS = {
  // Repositorys
  IUserRepository: Symbol.for("IUserRepository"),
  IUserPreferencesRepository: Symbol.for("IUserPreferencesRepository"),
};

export interface DI_RETURN_TYPES {
  // Repositorys
  IUserRepository: IUserRepository;
  IUserPreferencesRepository: IUserPreferencesRepository;
}
