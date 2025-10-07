import { App, AppDatas, AppInsert, AppUpdate } from "../../entities/models/app";

export interface IAppRepository {
  getApps(): Promise<AppDatas>;
  getAppById(appId: string): Promise<App>;
  getAppByUniqueFields(appName: string, appSlug: string): Promise<App | null>;
  createApp(app: AppInsert): Promise<App>;
  updateApp(app: AppUpdate): Promise<App>;
  deleteApp(appId: string): Promise<App>;
}
