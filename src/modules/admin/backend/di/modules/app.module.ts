import { Bind, ContainerModule } from "inversify";
import { IAppRepository } from "../../repositories";
import { DI_TYPES } from "../types";
import { AppRepository } from "../../repositories/appRepository";
import { AppService } from "../../services/appService";

const initializeModules = ({ bind }: { bind: Bind }) => {
  bind<IAppRepository>(DI_TYPES.AppRepository)
    .to(AppRepository)
    .inSingletonScope();
  bind<AppService>(DI_TYPES.AppService).to(AppService).inSingletonScope();
};

export const AppModule = new ContainerModule(initializeModules);
