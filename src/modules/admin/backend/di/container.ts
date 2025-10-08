import "reflect-metadata";
import { Container } from "inversify";
import { AppModule } from "./modules/app.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

const AdminContainer = new Container({ defaultScope: "Singleton" });

const initializeContainer = () => {
  AdminContainer.load(AppModule);
};

initializeContainer();

export const getAppInjection = <K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] => {
  return AdminContainer.get(DI_SYMBOLS[symbol]);
};

export { AdminContainer };
