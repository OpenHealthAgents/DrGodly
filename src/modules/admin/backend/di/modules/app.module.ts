import { Bind, ContainerModule } from "inversify";
import { IAppRepository } from "../../application/repositories/appRepository.interface";
import { DI_SYMBOLS } from "../types";
import { AppRepository } from "../../infrastructure/repositories/appRepository";
import { AppUseCases } from "../../application/useCases/app.useCases";
import { MockAppRepository } from "../../infrastructure/repositories/appRepository.mock";

const initializeModules = ({ bind }: { bind: Bind }) => {
  bind<IAppRepository>(DI_SYMBOLS.IAppRepository)
    .to(AppRepository)
    .inSingletonScope();
  bind<IAppRepository>(DI_SYMBOLS.IMockAppRepository)
    .to(MockAppRepository)
    .inSingletonScope();
  bind<AppUseCases>(DI_SYMBOLS.AppUseCases).to(AppUseCases).inSingletonScope();
};

export const AppModule = new ContainerModule(initializeModules);
