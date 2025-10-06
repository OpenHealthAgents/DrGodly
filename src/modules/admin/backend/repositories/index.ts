import { AppDatasDTO, AppDTO } from "../dtos/app";
import { AppInsert, AppUpdate } from "../types/app-types";

export interface IAppRepository {
  getApps(): Promise<AppDatasDTO>;
  getAppById(appId: string): Promise<AppDTO>;
  createApp(app: AppInsert): Promise<AppDTO>;
  updateApp(app: AppUpdate): Promise<AppDTO>;
  deleteApp(appId: string): Promise<AppDTO>;
}
