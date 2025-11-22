import { injectable } from "inversify";
import { IPatientProfileRepository } from "../../application/repositories/patientProfileRepository.interface";
import { prismaTelemedicine } from "../../../prisma/prisma";
import {
  PatientInitialProfileSchema,
  PatientPersonalDetailsSchema,
  TPatientCreateOrUpdatePatientProfile,
  TPatientInitialProfile,
  TPatientPersonalDetails,
} from "../../../../../modules/shared/entities/models/telemedicine/patientProfile";
import { OperationError } from "../../../../shared/entities/errors/commonError";
import { randomUUID } from "crypto";
import { logOperation } from "../../../../shared/utils/server-logger/log-operation";

@injectable()
export class PatientProfileRepository implements IPatientProfileRepository {
  constructor() {}

  async createPatientInitialProfile(
    orgId: string,
    userId: string,
    createdBy: string,
    isABHAPatientProfile: boolean
  ): Promise<TPatientInitialProfile> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "createPatientInitialProfileRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    try {
      const initialPatientProfile = await prismaTelemedicine.patient.create({
        data: {
          orgId,
          userId,
          isABHAPatientProfile,
          createdBy,
          updatedBy: createdBy,
        },
      });

      const data = await PatientInitialProfileSchema.parseAsync(
        initialPatientProfile
      );

      // Success log
      logOperation("success", {
        name: "createPatientInitialProfileRepository",
        startTimeMs,
        context: {
          operationId,
        },
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "createPatientInitialProfileRepository",
        startTimeMs,
        err: error,
        errName: "UnknownRepositoryError",
        context: {
          operationId,
        },
      });

      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async createPatientPersonalDetails(
    createData: TPatientCreateOrUpdatePatientProfile
  ): Promise<TPatientPersonalDetails> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "createPatientPersonalDetailsRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    const { id, operationBy, ...rest } = createData;

    if (id) {
      throw new Error("Failed to create patient profile.");
    }

    if (!rest.orgId || !rest.patientId) {
      throw new Error(
        "Missing organization or patient ID while creating profile."
      );
    }

    try {
      const patientPersonalDetails =
        await prismaTelemedicine.patientPersonalDetail.create({
          data: {
            ...rest,
            createdBy: operationBy,
            updatedBy: operationBy,
          },
        });

      const data = await PatientPersonalDetailsSchema.parseAsync(
        patientPersonalDetails
      );

      // Success log
      logOperation("success", {
        name: "createPatientPersonalDetailsRepository",
        startTimeMs,
        context: {
          operationId,
        },
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "createPatientPersonalDetailsRepository",
        startTimeMs,
        err: error,
        errName: "UnknownRepositoryError",
        context: {
          operationId,
        },
      });

      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }
}
