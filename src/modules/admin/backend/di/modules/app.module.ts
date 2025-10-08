import { Bind, ContainerModule } from "inversify";
import { IAppRepository } from "../../application/repositories/appRepository.interface";
import { DI_SYMBOLS } from "../types";
import { AppRepository } from "../../infrastructure/repositories/appRepository";
import { AppUseCases } from "../../application/useCases/app.useCases";

const initializeModules = ({ bind }: { bind: Bind }) => {
  bind<IAppRepository>(DI_SYMBOLS.IAppRepository)
    .to(AppRepository)
    .inSingletonScope();
  bind<AppUseCases>(DI_SYMBOLS.AppUseCases).to(AppUseCases).inSingletonScope();
};

export const AppModule = new ContainerModule(initializeModules);
