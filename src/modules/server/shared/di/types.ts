import { IMonitoringService } from "../monitoring/application/services/monitoringService.interface";
import { IUserRepository } from "../user/application/repositories/userRepository.interface";
import { IUserPreferencesRepository } from "../userPreferences/application/repositories/userPreferencesRepository.interface";

export const DI_SYMBOLS = {
  // Repositorys
  IUserRepository: Symbol.for("IUserRepository"),
  IUserPreferencesRepository: Symbol.for("IUserPreferencesRepository"),

  // Services
  IMonitoringService: Symbol.for("IMonitoringService"),
};

export interface DI_RETURN_TYPES {
  // Repositorys
  IUserRepository: IUserRepository;
  IUserPreferencesRepository: IUserPreferencesRepository;

  // Services
  IMonitoringService: IMonitoringService;
}
