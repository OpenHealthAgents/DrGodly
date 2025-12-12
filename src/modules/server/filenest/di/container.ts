import "reflect-metadata";
import { Container } from "inversify";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { CloudStorageModule } from "./modules";

const FilenestContainer = new Container({ defaultScope: "Singleton" });

const initializeContainer = () => {
  FilenestContainer.load(CloudStorageModule);
};

initializeContainer();

export const getFilenestInjection = <K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] => {
  return FilenestContainer.get(DI_SYMBOLS[symbol]);
};

export { FilenestContainer };
