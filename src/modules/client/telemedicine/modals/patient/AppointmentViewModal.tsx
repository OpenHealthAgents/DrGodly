"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  CreditCard,
  MapPin,
  ClipboardList,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { useSession } from "@/modules/client/auth/betterauth/auth-client";
import { usePatientModalStore } from "../../stores/patient-modal-store";

export function AppointmentViewDialog() {
  const session = useSession();
  const closeModal = usePatientModalStore((state) => state.onClose);
  const modalType = usePatientModalStore((state) => state.type);
  const isOpen = usePatientModalStore((state) => state.isOpen);
  const appointment = usePatientModalStore((state) => state.appointmentData);

  const isModalOpen = isOpen && modalType === "viewAppointment";

  if (!session || !isModalOpen) return null;

  function handleCloseModal() {
    closeModal();
  }

  if (!appointment) {
    return (
      <Dialog onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>Appointment not found</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-2xl p-6 rounded-2xl shadow-2xl border border-gray-200/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-900/80">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            Appointment Overview
          </DialogTitle>
          <DialogDescription className="text-sm font-medium">
            Detailed information about this appointment
          </DialogDescription>
        </DialogHeader>

        {/* Header Row */}
        <div className="flex justify-between items-center mt-2">
          <h3 className="text-xl font-semibold">{appointment.type}</h3>
          <Badge
            className="px-3 py-1 text-sm capitalize"
            variant={
              appointment.status === "COMPLETED"
                ? "default"
                : appointment.status === "PENDING"
                  ? "outline"
                  : "destructive"
            }
          >
            {appointment.status}
          </Badge>
        </div>

        <Separator className="my-4" />

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          {/* Schedule */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground tracking-wide">
              SCHEDULE
            </p>

            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span className="font-medium">
                {format(new Date(appointment.appointmentDate), "PPP")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{appointment.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="capitalize font-medium">
                {appointment.appointmentMode.toLowerCase()}
              </span>
            </div>
          </div>

          {/* Doctor / Patient */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground tracking-wide">
              PEOPLE
            </p>

            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              <span className="font-medium">
                Dr. {appointment.doctor.personal?.fullName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium">
                {appointment.patient.personal?.name}
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Payment */}
        <div className="flex items-center gap-2 text-sm">
          <CreditCard className="w-4 h-4" />
          <span className="font-semibold text-lg">
            {appointment.priceCurrency} {appointment.price}
          </span>
        </div>

        {/* Notes */}
        {appointment.note && (
          <div className="mt-4 bg-muted/40 p-4 rounded-xl border text-sm">
            <p>{appointment.note}</p>
          </div>
        )}

        <DialogFooter className="mt-4 flex justify-between items-center">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="rounded-full px-6"
            >
              Close
            </Button>
          </DialogClose>

          <div className="flex gap-2">
            <Button variant="secondary" className="rounded-full px-6">
              <ClipboardList className="w-4 h-4 mr-1" /> AI Intake Report
            </Button>
            <Button className="rounded-full px-6">
              <FileText className="w-4 h-4 mr-1" /> View Full Report
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
