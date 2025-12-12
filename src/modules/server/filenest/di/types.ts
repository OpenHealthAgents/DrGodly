import { ICloudStorageRepository } from "../application/repositories/cloudStorageRepository.interface";

export const DI_SYMBOLS = {
  // Repositorys
  ICloudStorageRepository: Symbol.for("ICloudStorageRepository"),
};

export interface DI_RETURN_TYPES {
  // Repositorys
  ICloudStorageRepository: ICloudStorageRepository;
}
