import { AppDatasDTO } from "../dtos/app";

export interface IAppRepository {
  getApps(): Promise<AppDatasDTO>;
  // createApp()
}
