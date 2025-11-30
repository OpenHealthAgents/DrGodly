"use client";

import DataTable from "@/modules/shared/components/table/data-table";
import { IAppointmentTableProps } from "./types";
import { appointmentColumn } from "./appointmentColumn";
import { usePatientModalStore } from "@/modules/client/telemedicine/stores/patient-modal-store";
import { EmptyState } from "@/modules/shared/components/EmptyState";
import { CalendarPlus, Plus } from "lucide-react";

const APPOINTMENT_STATUS = [
  "PENDING",
  "SCHEDULED",
  "CANCELLED",
  "COMPLETED",
  "INPROGRESS",
];

function AppointmentsTable({
  appointments,
  error,
  user,
}: IAppointmentTableProps) {
  const openModal = usePatientModalStore((state) => state.onOpen);

  if (appointments?.length === 0 || !appointments) {
    return (
      <EmptyState
        icon={<CalendarPlus />}
        title="No Appointments Yet"
        description="You have no scheduled appointments. Create a new one to get started."
        buttonLabel="Book Appointment"
        buttonIcon={<Plus />}
        buttonOnClick={() => {
          openModal({
            type: "bookAppointment",
          });
        }}
      />
    );
  }

  return (
    <DataTable
      columns={appointmentColumn(user)}
      data={appointments ?? []}
      dataSize={appointments?.length ?? 0}
      label={"Your Appointments"}
      addLabelName={"Book Appointment"}
      searchField="doctor"
      filterField="status"
      filterValues={APPOINTMENT_STATUS}
      error={(!appointments && error?.message) || null}
      fallbackText={
        (error && error.message) ||
        (appointments?.length === 0 && "No Services Found") ||
        undefined
      }
      openModal={() => {
        openModal({
          type: "bookAppointment",
        });
      }}
    />
  );
}

export default AppointmentsTable;
