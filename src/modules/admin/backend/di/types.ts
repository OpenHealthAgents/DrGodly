import { IAppRepository } from "@/modules/admin/backend/application/repositories/appRepository.interface";
import type { AppUseCases } from "../application/useCases/app.useCases";

export const DI_SYMBOLS = {
  // Repository
  IAppRepository: Symbol.for("IAppRepository"),

  // UseCases
  AppUseCases: Symbol.for("AppUseCases"),
};

export interface DI_RETURN_TYPES {
  // Repository
  IAppRepository: IAppRepository;

  // UseCases
  AppUseCases: AppUseCases;
}
