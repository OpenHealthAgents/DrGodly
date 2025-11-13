import "reflect-metadata";
import { Container } from "inversify";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";
import { DoctorProfileModule } from "./modules";

const TelemedicineContainer = new Container({ defaultScope: "Singleton" });

const initializeContainer = () => {
  TelemedicineContainer.load(DoctorProfileModule);
};

initializeContainer();

export const getTelemedicineInjection = <K extends keyof typeof DI_SYMBOLS>(
  symbol: K
): DI_RETURN_TYPES[K] => {
  return TelemedicineContainer.get(DI_SYMBOLS[symbol]);
};

export { TelemedicineContainer };
