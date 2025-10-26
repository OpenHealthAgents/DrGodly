import { IUserRepository } from "../user/application/repositories/userRepository.interface";

export const DI_SYMBOLS = {
  // Repositorys
  IUserRepository: Symbol.for("IUserRepository"),
};

export interface DI_RETURN_TYPES {
  // Repositorys
  IUserRepository: IUserRepository;
}
