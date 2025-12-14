import { TGetAppsControllerOutput } from "@/modules/server/admin/interface-adapters/controllers/app/getApps.controller";
import { TGetAppStorageSettingsControllerOutput } from "@/modules/server/filenest/interface-adapters/controllers/appStorageSetting";
import { TGetCloudStorageConfigsControllerOutput } from "@/modules/server/filenest/interface-adapters/controllers/cloudStorageConfig";
import { TGetLocalStorageConfigsControllerOutput } from "@/modules/server/filenest/interface-adapters/controllers/localStorageConfig";
import { ZSAError } from "zsa";

export interface IAppSettingsProps {
  appSettings: TGetAppStorageSettingsControllerOutput | null;
  appDatas: TGetAppsControllerOutput | null;
  cloudStorageConfigs: TGetCloudStorageConfigsControllerOutput | null;
  localStorageConfigs: TGetLocalStorageConfigsControllerOutput | null;
  error: ZSAError | null;
}

export type TAppSetting = TGetAppStorageSettingsControllerOutput[number];
export type TAppDatas = Pick<TGetAppsControllerOutput, "appDatas">;
export type TAppData = TAppDatas["appDatas"][number];

export type TAppSettingsColumnProps = {
  appDatas: TGetAppsControllerOutput | null;
  cloudStorageConfigs: TGetCloudStorageConfigsControllerOutput | null;
  localStorageConfigs: TGetLocalStorageConfigsControllerOutput | null;
};
