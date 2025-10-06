import { App } from "../../../../../prisma/generated/main-database";

export type TApp = Omit<App, "updatedAt">;

export type TAppData = TApp & {
  _count: {
    appMenuItems: number;
    appActions: number;
  };
};

export type AppInsert = Pick<App, "name" | "slug" | "description" | "type">;
export type AppUpdate = Pick<
  App,
  "id" | "name" | "slug" | "description" | "type"
>;
