import { injectable } from "inversify";
import { IAppointmentRepository } from "../../application/repositories/appointmentRepository.interface";
import { randomUUID } from "crypto";
import { logOperation } from "../../../../shared/utils/server-logger/log-operation";
import { OperationError } from "../../../../shared/entities/errors/commonError";
import { prismaTelemedicine } from "../../../prisma/prisma";
import {
  AppointmentSchema,
  AppointmentsSchema,
  TAppointment,
  TAppointments,
  TBookAppointment,
} from "../../../../shared/entities/models/telemedicine/appointment";

injectable();
export class AppointmentRepository implements IAppointmentRepository {
  constructor() {}

  async getAppointmentsForDoctor(
    doctorId: string,
    orgId: string
  ): Promise<TAppointments> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "getAppointmentForDoctorRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    try {
      const appointements = await prismaTelemedicine.appointment.findMany({
        where: {
          doctorId,
          orgId,
        },
        include: {
          patient: {
            omit: {
              createdAt: true,
              updatedAt: true,
              updatedBy: true,
              createdBy: true,
            },
            include: {
              personal: {
                select: {
                  name: true,
                  orgId: true,
                  id: true,
                  gender: true,
                },
              },
            },
          },
          doctor: {
            omit: {
              createdAt: true,
              updatedAt: true,
              updatedBy: true,
              createdBy: true,
            },
            include: {
              personal: {
                select: {
                  fullName: true,
                  orgId: true,
                  id: true,
                  gender: true,
                },
              },
            },
          },
        },
      });

      const data = await AppointmentsSchema.parseAsync(appointements);

      // Success log
      logOperation("success", {
        name: "getAppointmentForDoctorRepository",
        startTimeMs,
        context: {
          operationId,
        },
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "getAppointmentForDoctorRepository",
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

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }

  async getAppointmentsForPatient(
    patientId: string,
    orgId: string
  ): Promise<TAppointments> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "getAppointmentForPatientRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    try {
      const appointements = await prismaTelemedicine.appointment.findMany({
        where: {
          patientId,
          orgId,
        },
        include: {
          patient: {
            omit: {
              createdAt: true,
              updatedAt: true,
              updatedBy: true,
              createdBy: true,
            },
            include: {
              personal: {
                select: {
                  name: true,
                  orgId: true,
                  id: true,
                  gender: true,
                },
              },
            },
          },
          doctor: {
            omit: {
              createdAt: true,
              updatedAt: true,
              updatedBy: true,
              createdBy: true,
            },
            include: {
              personal: {
                select: {
                  fullName: true,
                  orgId: true,
                  id: true,
                  gender: true,
                },
              },
            },
          },
        },
      });

      const data = await AppointmentsSchema.parseAsync(appointements);

      // Success log
      logOperation("success", {
        name: "getAppointmentForPatientRepository",
        startTimeMs,
        context: {
          operationId,
        },
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "getAppointmentForPatientRepository",
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

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }

  async bookAppointment(
    appointmentData: TBookAppointment
  ): Promise<TAppointment> {
    const startTimeMs = Date.now();
    const operationId = randomUUID();

    // Start log
    logOperation("start", {
      name: "bookAppointmentRepository",
      startTimeMs,
      context: {
        operationId,
      },
    });

    try {
      const appointement = await prismaTelemedicine.appointment.create({
        data: {
          ...appointmentData,
        },
        include: {
          patient: {
            omit: {
              createdAt: true,
              updatedAt: true,
              updatedBy: true,
              createdBy: true,
            },
            include: {
              personal: {
                select: {
                  name: true,
                  orgId: true,
                  id: true,
                  gender: true,
                },
              },
            },
          },
          doctor: {
            omit: {
              createdAt: true,
              updatedAt: true,
              updatedBy: true,
              createdBy: true,
            },
            include: {
              personal: {
                select: {
                  fullName: true,
                  orgId: true,
                  id: true,
                  gender: true,
                },
              },
            },
          },
        },
      });

      const data = await AppointmentSchema.parseAsync(appointement);

      // Success log
      logOperation("success", {
        name: "bookAppointmentRepository",
        startTimeMs,
        context: {
          operationId,
        },
      });

      return data;
    } catch (error) {
      // Error log
      logOperation("error", {
        name: "bookAppointmentRepository",
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

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }
}
