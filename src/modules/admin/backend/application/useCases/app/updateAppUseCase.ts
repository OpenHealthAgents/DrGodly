import { getAppInjection } from "../../../di/container";
import { App, UpdateApp } from "../../../entities/models/app";

export async function updateAppUseCase(appData: UpdateApp): Promise<App> {
  const appRepository = getAppInjection("IAppRepository");
  const app = await appRepository.updateApp(appData);
  return app;
}
