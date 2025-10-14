import { IAppRepository } from "@/modules/admin/backend/application/repositories/appRepository.interface";

export const DI_SYMBOLS = {
  // Repositorys
  IAppRepository: Symbol.for("IAppRepository"),
};

export interface DI_RETURN_TYPES {
  // Repositorys
  IAppRepository: IAppRepository;
}
