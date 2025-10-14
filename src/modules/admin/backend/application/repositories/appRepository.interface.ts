import { App, AppDatas, CreateApp, UpdateApp } from "../../entities/models/app";

export interface IAppRepository {
  getApps(): Promise<AppDatas>;
  getAppById(appId: string): Promise<App>;
  getAppByUniqueFields(appName: string, appSlug: string): Promise<App | null>;
  createApp(app: CreateApp): Promise<App>;
  updateApp(app: UpdateApp): Promise<App>;
  deleteApp(appId: string): Promise<App>;
}
