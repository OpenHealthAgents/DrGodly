import { injectable } from "inversify";
import { IDoctorProfileRepository } from "../../application/repositories/doctorProfileRepository.interface";
import { prismaTelemedicine } from "../../../prisma/prisma";
import {
  DoctorDatasSchema,
  DoctorInitialProfileSchema,
  DoctorSchema,
  TCreateOrUpdateDoctorProfileDetail,
  TDoctor,
  TDoctorDatas,
  TDoctorInitialProfile,
  TDoctorPersonalDetails,
  DoctorPersonalDetailsSchema,
} from "../../../../shared/entities/models/telemedicine/doctorProfile";
import { OperationError } from "../../../../shared/entities/errors/commonError";
import { logOperation } from "../../../../shared/utils/server-logger/log-operation";
import { randomUUID } from "crypto";

injectable();
export class DoctorProfileRepository implements IDoctorProfileRepository {
  constructor() {}

  async getAllDoctorsData(orgId: string): Promise<TDoctorDatas> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "getAllDoctorsDataRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    try {
      const doctorDatas = await prismaTelemedicine.doctor.findMany({
        where: {
          orgId,
        },
        include: {
          personal: {
            include: {
              kycAddress: true,
              communicationAddress: true,
              languagesSpoken: true,
              socialAccounts: true,
            },
          },
          qualification: {
            include: {
              qualifications: true,
            },
          },
          workDetail: {
            include: {
              workingFacilities: true,
            },
          },
          concent: true,
        },
      });

      const total = await prismaTelemedicine.doctor.count({
        where: {
          orgId,
        },
      });

      const result = await DoctorDatasSchema.parseAsync({
        doctorDatas,
        total,
      });

      // Success log
      logOperation("success", {
        name: "getAllDoctorsDataRepository",
        startTimeMs,
      });

      return result;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "getAllDoctorsDataRepository",
        startTimeMs,
        err: error,
        errName: "UnknownRepositoryError",
      });

      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async createDoctorInitialProfile(
    orgId: string,
    createdBy: string
  ): Promise<TDoctorInitialProfile> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "createDoctorInitialProfileRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    try {
      const initialDoctorProfile = await prismaTelemedicine.doctor.create({
        data: {
          orgId,
          createdBy,
          updatedBy: createdBy,
        },
      });

      const data = await DoctorInitialProfileSchema.parseAsync(
        initialDoctorProfile
      );

      // Success log
      logOperation("success", {
        name: "createDoctorInitialProfileRepository",
        startTimeMs,
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "createDoctorInitialProfileRepository",
        startTimeMs,
        err: error,
        errName: "UnknownRepositoryError",
      });

      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async deleteDoctorProfile(id: string): Promise<TDoctorInitialProfile> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "deleteDoctorProfileRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    try {
      const doctorProfileData = await prismaTelemedicine.doctor.delete({
        where: {
          id,
        },
      });

      const data = await DoctorInitialProfileSchema.parseAsync(
        doctorProfileData
      );

      // Success log
      logOperation("success", {
        name: "deleteDoctorProfileRepository",
        startTimeMs,
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "deleteDoctorProfileRepository",
        startTimeMs,
        err: error,
        errName: "UnknownRepositoryError",
      });

      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async getDoctorDataById(id: string): Promise<TDoctor | null> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "getDoctorDataByIdRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    try {
      const doctorData = await prismaTelemedicine.doctor.findUnique({
        where: {
          id,
        },
        include: {
          personal: {
            include: {
              kycAddress: true,
              communicationAddress: true,
              languagesSpoken: true,
              socialAccounts: true,
            },
          },
          qualification: {
            include: {
              qualifications: true,
            },
          },
          workDetail: {
            include: {
              workingFacilities: true,
            },
          },
          concent: true,
        },
      });

      if (!doctorData) return null;

      const data = await DoctorSchema.parseAsync(doctorData);

      // Success log
      logOperation("success", {
        name: "getDoctorDataByIdRepository",
        startTimeMs,
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "getDoctorDataByIdRepository",
        startTimeMs,
        err: error,
        errName: "UnknownRepositoryError",
      });

      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async createDoctorPersonalDetails(
    createData: TCreateOrUpdateDoctorProfileDetail
  ): Promise<TDoctorPersonalDetails> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "createDoctorPersonalDetailsRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    const {
      languagesSpoken,
      kycAddress,
      communicationAddress,
      socialAccounts,
      operationBy,
      id,
      ...rest
    } = createData;

    if (id) {
      throw new Error("Failed to create doctor profile.");
    }

    const lang = languagesSpoken.map((lang) => ({
      langCode: lang,
      orgId: rest.orgId,
      createdBy: operationBy,
      updatedBy: operationBy,
    }));

    const kyc = {
      ...kycAddress,
      orgId: rest.orgId,
      createdBy: operationBy,
      updatedBy: operationBy,
    };

    const comm = {
      ...communicationAddress,
      orgId: rest.orgId,
      createdBy: operationBy,
      updatedBy: operationBy,
    };

    const social =
      socialAccounts?.map((acc) => ({
        orgId: rest.orgId,
        createdBy: operationBy,
        updatedBy: operationBy,
        platform: acc.platform ?? "",
        url: acc.url ?? "",
      })) ?? [];

    try {
      const doctorPersonalDetails =
        await prismaTelemedicine.doctorPersonalDetail.create({
          data: {
            ...rest,
            createdBy: operationBy,
            updatedBy: operationBy,
            languagesSpoken: {
              createMany: {
                data: [...lang],
              },
            },
            kycAddress: {
              create: {
                ...kyc,
              },
            },
            communicationAddress: {
              create: {
                ...comm,
              },
            },
            socialAccounts: {
              createMany: {
                data: [...social],
              },
            },
          },
          include: {
            communicationAddress: true,
            kycAddress: true,
            languagesSpoken: true,
            socialAccounts: true,
          },
        });

      const data = await DoctorPersonalDetailsSchema.parseAsync(
        doctorPersonalDetails
      );

      // Success log
      logOperation("success", {
        name: "createDoctorPersonalDetailsRepository",
        startTimeMs,
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "createDoctorPersonalDetailsRepository",
        startTimeMs,
        err: error,
        errName: "UnknownRepositoryError",
      });

      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async editDoctorPersonalDetails(
    editData: TCreateOrUpdateDoctorProfileDetail
  ): Promise<TDoctorPersonalDetails> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "editDoctorPersonalDetailsRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    const {
      languagesSpoken,
      kycAddress,
      communicationAddress,
      socialAccounts,
      operationBy,
      id,
      ...rest
    } = editData;

    if (!id) {
      throw new Error("Failed to edit doctor profile.");
    }

    const lang = languagesSpoken.map((lang) => ({
      langCode: lang,
      orgId: rest.orgId,
      createdBy: operationBy,
      updatedBy: operationBy,
    }));

    const kyc = {
      ...kycAddress,
      orgId: rest.orgId,
      createdBy: operationBy,
      updatedBy: operationBy,
    };

    const comm = {
      ...communicationAddress,
      orgId: rest.orgId,
      createdBy: operationBy,
      updatedBy: operationBy,
    };

    const social =
      socialAccounts?.map((acc) => ({
        orgId: rest.orgId,
        createdBy: operationBy,
        updatedBy: operationBy,
        platform: acc.platform ?? "",
        url: acc.url ?? "",
      })) ?? [];

    try {
      const doctorPersonalDetails =
        await prismaTelemedicine.doctorPersonalDetail.update({
          where: {
            id,
          },
          data: {
            ...rest,
            createdBy: operationBy,
            updatedBy: operationBy,
            languagesSpoken: {
              createMany: {
                data: [...lang],
              },
            },
            kycAddress: {
              create: {
                ...kyc,
              },
            },
            communicationAddress: {
              create: {
                ...comm,
              },
            },
            socialAccounts: {
              createMany: {
                data: [...social],
              },
            },
          },
          include: {
            communicationAddress: true,
            kycAddress: true,
            languagesSpoken: true,
            socialAccounts: true,
          },
        });

      const data = await DoctorPersonalDetailsSchema.parseAsync(
        doctorPersonalDetails
      );

      // Success log
      logOperation("success", {
        name: "editDoctorPersonalDetailsRepository",
        startTimeMs,
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "editDoctorPersonalDetailsRepository",
        startTimeMs,
        err: error,
        errName: "UnknownRepositoryError",
      });

      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async createDoctorQualificationsDetails(): Promise<void> {}

  async createDoctorConcent(): Promise<void> {}

  async createDoctorWorkDetails(): Promise<void> {}

  async editDoctorConcent(): Promise<void> {}

  async editDoctorQualificationsDetails(): Promise<void> {}

  async editDoctorWorkDetails(): Promise<void> {}
}
