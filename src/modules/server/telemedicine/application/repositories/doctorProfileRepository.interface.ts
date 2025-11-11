import {
  TCreateOrUpdateDoctorProfileDetail,
  TDoctor,
  TDoctorDatas,
  TDoctorInitialProfile,
  TDoctorPersonalDetails,
} from "../../../../shared/entities/models/telemedicine/doctorProfile";

export interface IDoctorProfileRepository {
  getAllDoctorsData(orgId: string): Promise<TDoctorDatas>;
  createDoctorInitialProfile(
    orgId: string,
    createdBy: string
  ): Promise<TDoctorInitialProfile>;
  deleteDoctorProfile(id: string): Promise<TDoctorInitialProfile>;
  getDoctorDataById(id: string): Promise<TDoctor | null>;
  createDoctorPersonalDetails(
    createData: TCreateOrUpdateDoctorProfileDetail
  ): Promise<TDoctorPersonalDetails>;
  updateDoctorPersonalDetails(
    updateData: TCreateOrUpdateDoctorProfileDetail
  ): Promise<TDoctorPersonalDetails>;

  createDoctorQualificationsDetails(): Promise<void>;
  createDoctorWorkDetails(): Promise<void>;
  createDoctorConcent(): Promise<void>;

  editDoctorQualificationsDetails(): Promise<void>;
  editDoctorWorkDetails(): Promise<void>;
  editDoctorConcent(): Promise<void>;
}
