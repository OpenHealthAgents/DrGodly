import { TUserPreference } from "../../entities/models/userPreferences";

export interface IUserPreferencesRepository {
  getUserPreferences(userId: string): Promise<TUserPreference | null>;
  updateUserPreferences(
    fields: TUserPreference
  ): Promise<TUserPreference | null>;
}
