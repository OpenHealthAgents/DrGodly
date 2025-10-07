import { inject, injectable } from "inversify";
import type { IAppRepository } from "../repositories/appRepository.interface";
import { DI_TYPES } from "../../di/types";
import { AppDatas, App, AppInsert, AppUpdate } from "../../entities/models/app";

@injectable()
export class AppUseCases {
  constructor(
    @inject(DI_TYPES.AppRepository)
    private _appsRepository: IAppRepository
  ) {}

  async getApps(): Promise<AppDatas> {
    const appDatas = await this._appsRepository.getApps();
    return appDatas;
  }

  async getAppById(appId: string): Promise<App> {
    const app = await this._appsRepository.getAppById(appId);
    return app;
  }

  async getAppByUniqueFields(
    appName: string,
    appSlug: string
  ): Promise<App | null> {
    const app = await this._appsRepository.getAppByUniqueFields(
      appName,
      appSlug
    );
    return app;
  }

  async createApp(app: AppInsert): Promise<App> {
    const existingApp = await this.getAppByUniqueFields(app.name, app.slug);

    if (existingApp) {
      throw new Error("App is already exist");
    }

    const newApp = await this._appsRepository.createApp(app);
    return newApp;
  }

  async updateApp(appData: AppUpdate): Promise<App> {
    const app = await this._appsRepository.updateApp(appData);
    return app;
  }

  async deleteApp(appId: string): Promise<App> {
    const app = await this._appsRepository.deleteApp(appId);
    return app;
  }
}
