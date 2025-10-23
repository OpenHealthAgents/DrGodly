import { IAppRepository } from "@/modules/server/admin/application/repositories/appRepository.interface";
import { IAppMenuItemRepository } from "../application/repositories/appMenuItemRepository.interface";
import { IOrganizationRepository } from "../application/repositories/organizationRepository.interface";

export const DI_SYMBOLS = {
  // Repositorys
  IAppRepository: Symbol.for("IAppRepository"),
  IAppMenuItemRepository: Symbol.for("IAppMenuItemRepository"),
  IOrganizationRepository: Symbol.for("IOrganizationRepository"),
};

export interface DI_RETURN_TYPES {
  // Repositorys
  IAppRepository: IAppRepository;
  IAppMenuItemRepository: IAppMenuItemRepository;
  IOrganizationRepository: IOrganizationRepository;
}
