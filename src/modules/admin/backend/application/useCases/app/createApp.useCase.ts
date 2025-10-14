import { getAppInjection } from "../../../di/container";
import { App, CreateApp } from "../../../entities/models/app";

export async function createAppUseCase(app: CreateApp): Promise<App> {
  const appRepository = getAppInjection("IAppRepository");

  const existingApp = await appRepository.getAppByUniqueFields(
    app.name,
    app.slug
  );

  if (existingApp) {
    throw new Error(`App already exists.`);
  }

  const newApp = await appRepository.createApp(app);
  return newApp;
}
