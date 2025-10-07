import { Bind, ContainerModule } from "inversify";
import { IAppRepository } from "../../application/repositories/appRepository.interface";
import { DI_TYPES } from "../types";
import { AppRepository } from "../../infrastructure/repositories/appRepository";
import { AppUseCases } from "../../application/use-cases/appUseCases";

const initializeModules = ({ bind }: { bind: Bind }) => {
  bind<IAppRepository>(DI_TYPES.AppRepository)
    .to(AppRepository)
    .inSingletonScope();
  bind<AppUseCases>(DI_TYPES.AppUseCases).to(AppUseCases).inSingletonScope();
};

export const AppModule = new ContainerModule(initializeModules);
