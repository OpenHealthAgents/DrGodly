import { TApps } from "../../entities/models/app";

export interface IAppRepository {
  getAppsByOrgId(orgId: string): Promise<TApps>;
}
