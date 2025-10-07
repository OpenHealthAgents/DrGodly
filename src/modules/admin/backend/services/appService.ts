import { inject, injectable } from "inversify";
import { AppDatasDTO, AppDTO } from "../dtos/app";
import type { IAppRepository } from "../repositories";
import { DI_TYPES } from "../di/types";
import { AppInsert, AppUpdate } from "../types/app-types";

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

  async getAppById(appId: string): Promise<AppDTO> {
    const app = await this._appsRepository.getAppById(appId);
    return app;
  }

  async getAppByUniqueFields(
    appName: string,
    appSlug: string
  ): Promise<AppDTO | null> {
    const app = await this._appsRepository.getAppByUniqueFields(
      appName,
      appSlug
    );
    return app;
  }

  async createApp(app: AppInsert): Promise<AppDTO> {
    const existingApp = await this.getAppByUniqueFields(app.name, app.slug);

    if (existingApp) {
      throw new Error("App is already exist");
    }

    const newApp = await this._appsRepository.createApp(app);
    return newApp;
  }

  async updateApp(appData: AppUpdate): Promise<AppDTO> {
    const app = await this._appsRepository.updateApp(appData);
    return app;
  }

  async deleteApp(appId: string): Promise<AppDTO> {
    const app = await this._appsRepository.deleteApp(appId);
    return app;
  }
}
