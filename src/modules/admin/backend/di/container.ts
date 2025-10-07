import "reflect-metadata";
import { Container } from "inversify";
import { AppModule } from "./modules/app.module";

const AdminContainer = new Container({ defaultScope: "Singleton" });

const initializeContainer = () => {
  AdminContainer.load(AppModule);
};

initializeContainer();

export const getAppInjection = <T>(symbol: symbol) => {
  return AdminContainer.get<T>(symbol);
};

export { AdminContainer };
