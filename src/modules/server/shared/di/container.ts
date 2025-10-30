import "reflect-metadata";
import { Container } from "inversify";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { UserModule } from "./modules/user.module";
import { UserPreferencesModule } from "./modules/userPreferences.module";

const SharedContainer = new Container({ defaultScope: "Singleton" });

const initializeContainer = () => {
  SharedContainer.load(UserModule);
  SharedContainer.load(UserPreferencesModule);
};

initializeContainer();

export const getSharedInjection = <K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] => {
  return SharedContainer.get(DI_SYMBOLS[symbol]);
};

export { SharedContainer };
