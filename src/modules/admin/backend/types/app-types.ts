import { App } from "../../../../../prisma/generated/main-database";

export type TApp = Omit<App, "updatedAt">;

export type TAppData = TApp & {
  _count: {
    appMenuItems: number;
    appActions: number;
  };
};
