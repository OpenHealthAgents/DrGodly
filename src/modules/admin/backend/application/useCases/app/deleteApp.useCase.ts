import { getAppInjection } from "../../../di/container";
import { App } from "../../../entities/models/app";

export async function deleteAppUseCase(appId: string): Promise<App> {
  const appRepository = getAppInjection("IAppRepository");
  const app = await appRepository.deleteApp(appId);
  return app;
}
