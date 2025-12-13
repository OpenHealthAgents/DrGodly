import {
  TAppStorageSettingsSchema,
  TAppStorageSettingSchema,
  TGetAppStorageSettings,
  TCreateAppStorageSetting,
  TUpdateAppStorageSetting,
  TDeleteAppStorageSetting,
} from "../../../../shared/entities/models/filenest/appStorageSettings";

export interface IAppStorageSettingRepository {
  getAppStorageSettings(
    getData: TGetAppStorageSettings
  ): Promise<TAppStorageSettingsSchema>;

  createAppStorageSetting(
    createData: TCreateAppStorageSetting
  ): Promise<TAppStorageSettingSchema>;

  updateAppStorageSetting(
    updateData: TUpdateAppStorageSetting
  ): Promise<TAppStorageSettingSchema>;

  deleteAppStorageSetting(
    deleteData: TDeleteAppStorageSetting
  ): Promise<TAppStorageSettingSchema>;
}
