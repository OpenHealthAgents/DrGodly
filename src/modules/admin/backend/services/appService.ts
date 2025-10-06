import { inject, injectable } from "inversify";
import { AppDatasDTO } from "../dtos/app";
import type { IAppRepository } from "../repositories";
import { DI_TYPES } from "../di/types";

@injectable()
export class AppService {
  constructor(
    @inject(DI_TYPES.AppRepository)
    private _appsRepository: IAppRepository
  ) {}

  async getApps(): Promise<AppDatasDTO> {
    const appDatas = await this._appsRepository.getApps();
    return appDatas;
  }
}

// 1. if we want another service in a service then create it as instance at the moment with that ServiceLocator class because it will cache those services.
