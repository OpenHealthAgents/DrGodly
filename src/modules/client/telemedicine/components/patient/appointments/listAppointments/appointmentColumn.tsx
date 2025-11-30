import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ProfileAvatar } from "@/modules/shared/components/ProfileAvatar";
import { AppointmentStatusIndicator } from "./AppointmentStatusIndicator";
import { Ban, EllipsisVertical, PencilLine, Trash2 } from "lucide-react";
import { TanstackTableColumnSorting } from "@/modules/shared/components/table/tanstack-table-column-sorting";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { TAppointment } from "@/modules/shared/entities/models/telemedicine/appointment";
import { TSharedUser } from "@/modules/shared/types";
import { PatientModalStore } from "@/modules/client/telemedicine/stores/patient-modal-store";

export const appointmentColumn = (
  user: TSharedUser
): ColumnDef<TAppointment>[] => [
  {
    header: "INFO",
    accessorKey: "patient",
    cell: ({ row }) => {
      const patientData = row.original.patient;
      return (
        <div className="flex items-center gap-2 2xl:gap-3 py-2">
          <ProfileAvatar imgUrl={null} name={patientData.personal?.name} />
          <div className="font-semibold">
            <h3>{patientData.personal?.name}</h3>
            <span className="text-xs md:text-sm font-light capitalize">
              {patientData.personal?.gender?.toLowerCase()}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label="DATE"
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "appointmentDate",
    cell: ({ row }) => {
      const date: string = row.getValue("appointmentDate");
      const formattedDate = format(date, "MMM dd, yyy");
      return <div>{formattedDate}</div>;
    },
  },
  {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label="TIME"
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "time",
  },
  {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label="DOCTOR"
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "doctor",
    filterFn: (row, columnId, filterValue) => {
      const doctor = row.original.doctor;
      return doctor
        .personal!.fullName.toLowerCase()
        .includes((filterValue as string).toLowerCase());
    },
    cell: ({ row }) => {
      const doctorData = row.original.doctor;

      return (
        <div className="flex items-center gap-2 2xl:gap-3 py-2">
          <ProfileAvatar imgUrl={null} name={doctorData.personal?.fullName} />
          <div className="font-semibold">
            <h3 className="capitalize">{doctorData.personal?.fullName}</h3>
            <span className="text-xs md:text-sm font-light capitalize">
              {doctorData.personal?.gender}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <TanstackTableColumnSorting
          label="STATUS"
          column={column}
          isSorted={isSorted}
        />
      );
    },
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <AppointmentStatusIndicator status={status} />;
    },
  },
  {
    header: "ACTIONS",
    id: "actions",
    cell: ({ row }) => {
      const appointmentData = row.original;
      const id = appointmentData.id;
      const status = appointmentData.status;

      const openModal = PatientModalStore((state) => state.onOpen);

      return (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            className="rounded-full"
            onClick={() =>
              openModal({
                type: "viewAppointment",
                appointmentData: appointmentData,
              })
            }
          >
            View
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ size: "icon", variant: "ghost" }),
                "rounded-full"
              )}
            >
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="left">
              {status === "PENDING" && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => openModal({ type: "rescheduleAppointment" })}
                >
                  <PencilLine />
                  ReSchedule
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {appointmentData.status === "COMPLETED" ||
              appointmentData.status === "CANCELLED" ? (
                <DropdownMenuItem
                  className="space-x-2 cursor-pointer text-rose-600 dark:text-rose-500 hover:!text-rose-600 dark:hover:!text-rose-500"
                  onClick={() => openModal({ type: "deleteAppointment" })}
                >
                  <div className="flex items-center gap-2">
                    <Trash2 className="text-rose-600 dark:text-rose-500" />
                    Delete
                  </div>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="space-x-2 cursor-pointer text-rose-600 dark:text-rose-500 hover:!text-rose-600 dark:hover:!text-rose-500"
                  onClick={() => openModal({ type: "cancelAppointment" })}
                >
                  <div className="flex items-center gap-2">
                    <Ban className="text-rose-600 dark:text-rose-500" />
                    Cancel
                  </div>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {appointmentData.appointmentMode === "VIRTUAL" &&
            appointmentData.status === "SCHEDULED" && (
              <Link
                className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
                href={`/bezs/telemedicine/patient/appointments/online-consultation?roomId=${appointmentData.virtualRoomId}`}
              >
                Consult Online
              </Link>
            )}
        </div>
      );
    },
  },
];
