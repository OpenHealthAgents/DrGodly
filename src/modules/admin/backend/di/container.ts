import "reflect-metadata";
import { Container } from "inversify";
import { DI_TYPES } from "./types";

import { AppRepository } from "../repositories/appRepository";
import { AppService } from "../services/appService";
import { IAppRepository } from "../repositories";

const container = new Container({ defaultScope: "Singleton" });

container.bind<IAppRepository>(DI_TYPES.AppRepository).to(AppRepository);
container.bind<AppService>(DI_TYPES.AppService).to(AppService);

export { container };
