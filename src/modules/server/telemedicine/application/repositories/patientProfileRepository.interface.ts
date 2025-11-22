import {
  TPatientCreateOrUpdatePatientProfile,
  TPatientInitialProfile,
  TPatientPersonalDetails,
} from "../../../../../modules/shared/entities/models/telemedicine/patientProfile";

export interface IPatientProfileRepository {
  createPatientInitialProfile(
    orgId: string,
    userId: string,
    createdBy: string,
    isABHAPatientProfile: boolean
  ): Promise<TPatientInitialProfile>;
  createPatientPersonalDetails(
    createData: TPatientCreateOrUpdatePatientProfile
  ): Promise<TPatientPersonalDetails>;
}
