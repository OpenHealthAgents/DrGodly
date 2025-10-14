import { getAppInjection } from "../../../di/container";
import { AppDatas } from "../../../entities/models/app";

export async function getAppsUseCase(): Promise<AppDatas> {
  const appRepository = getAppInjection("IAppRepository");
  const appDatas = await appRepository.getApps();
  return appDatas;
}
