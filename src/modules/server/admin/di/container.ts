import "reflect-metadata";
import { Container } from "inversify";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { AppModule } from "./modules/app.module";
import { AppMenuItemModule } from "./modules/appMenuItem.module";
import { OrganizationModule } from "./modules/organization.module";

const AdminContainer = new Container({ defaultScope: "Singleton" });

const initializeContainer = () => {
  AdminContainer.load(AppModule);
  AdminContainer.load(AppMenuItemModule);
  AdminContainer.load(OrganizationModule);
};

initializeContainer();

export const getAdminInjection = <K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] => {
  return AdminContainer.get(DI_SYMBOLS[symbol]);
};

export { AdminContainer };

// 2:22:21
