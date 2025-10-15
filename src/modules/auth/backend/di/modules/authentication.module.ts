import { Bind, ContainerModule } from "inversify";
import { DI_SYMBOLS } from "../types";
import { IAuthenticationService } from "../../application/services/authenticationService.interface";
import { BetterauthAuthenticationService } from "../../infrastructure/services/BetterauthAuthenticationService";
import { KeyCloakAuthenticationService } from "../../infrastructure/services/KeyCloakAuthenticationService";

const initializeModules = ({ bind }: { bind: Bind }) => {
  bind<IAuthenticationService>(DI_SYMBOLS.IBetterauthAuthenticationService)
    .to(BetterauthAuthenticationService)
    .inSingletonScope();
  bind<IAuthenticationService>(DI_SYMBOLS.IKeycloakAuthenticationService)
    .to(KeyCloakAuthenticationService)
    .inSingletonScope();
};

export const AuthenticationModule = new ContainerModule(initializeModules);
