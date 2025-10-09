import { OperationError } from "@/modules/shared/entities/errors/commonError";
import { IAppRepository } from "../../application/repositories/appRepository.interface";
import {
  AppDatas,
  App,
  AppInsert,
  AppUpdate,
  AppsWithMenuActionCount,
} from "../../entities/models/app";
import { randomUUID } from "crypto";
import { injectable } from "inversify";

@injectable()
export class MockAppRepository implements IAppRepository {
  private _apps: App[];

  constructor() {
    this._apps = [];
    // TODO (good to have): seed database here
  }

  async getApps(): Promise<AppDatas> {
    // const _count = {
    //   appMenuItems: Math.floor(Math.random() * 5),
    //   appActions: Math.floor(Math.random() * 5),
    // };

    const newApp: AppsWithMenuActionCount = [...this._apps]
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .map((app) => ({
        ...app,
        _count: {
          appMenuItems: Math.floor(Math.random() * 5),
          appActions: Math.floor(Math.random() * 5),
        },
      }));

    const appDatas: AppDatas = {
      appDatas: newApp,
      total: this._apps.length,
    };

    console.log(this._apps);

    return appDatas;
  }

  async getAppById(appId: string): Promise<App> {
    const existingApp = this._apps.find((app) => app.id === appId);

    if (!existingApp) throw new OperationError("Cound not find the app");

    return existingApp;
  }

  async getAppByUniqueFields(
    appName: string,
    appSlug: string
  ): Promise<App | null> {
    const existingApp = this._apps.find(
      (app) => app.name === appName && app.slug === appSlug
    );

    return existingApp ?? null;
  }

  async createApp(app: AppInsert): Promise<App> {
    const newApp: App = {
      id: randomUUID(),
      name: app.name,
      description: app.description,
      type: app.type,
      slug: app.slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      imageUrl: null,
    };

    this._apps.push(newApp);
    return newApp;
  }

  async updateApp(app: AppUpdate): Promise<App> {
    const existingApp = this._apps.find((data) => data.id === app.id);

    if (!existingApp) throw new OperationError("Cound not find the app");

    const newApp: App = {
      ...existingApp,
      ...app,
      updatedAt: new Date(),
    };

    this._apps = this._apps.map((data) => (data.id === app.id ? newApp : data));

    return newApp;
  }

  async deleteApp(appId: string): Promise<App> {
    const deletingApp = this._apps.find((app) => app.id === appId);

    if (!deletingApp) throw new OperationError("Cound not find the app");

    this._apps = this._apps.filter((app) => app.id !== appId);

    return deletingApp;
  }
}
