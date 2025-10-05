import { AppDatasDTO } from "../dtos/app";
import { IAppRepository } from "../repositories";

export class AppService {
  // private _appsRepository: IAppRepository;

  constructor(private _appsRepository: IAppRepository) {
    // this._appsRepository = appsRepository;
  }

  async getApps(): Promise<AppDatasDTO> {
    const appDatas = await this._appsRepository.getApps();
    return appDatas;
  }
}

// 1. if we want another service in a service then create it as instance at the moment with that ServiceLocator class because it will cache those services.
