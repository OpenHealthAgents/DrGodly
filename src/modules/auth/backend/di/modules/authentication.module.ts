import { Bind, ContainerModule } from "inversify";
import { DI_SYMBOLS } from "../types";
import { IAuthenticationService } from "../../application/services/authenticationService.interface";
import { AuthenticationService } from "../../infrastructure/services/authenticationService";

const initializeModules = ({ bind }: { bind: Bind }) => {
  bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService)
    .to(AuthenticationService)
    .inSingletonScope();
};

export const AuthenticationModule = new ContainerModule(initializeModules);
