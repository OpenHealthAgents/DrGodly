import { getServerSession } from "@/modules/server/auth/betterauth/auth-server";
import { getPatientAppointments } from "@/modules/client/telemedicine/server-actions/appointment-action";
import AppointmentsTable from "@/modules/client/telemedicine/components/patient/appointments/listAppointments/AppointmentsTable";

async function AppointmentsPage() {
  const session = await getServerSession();

  if (!session || !session.user.currentOrgId) {
    throw new Error("UNAUTHORIZED");
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    username: session.user.username,
    email: session.user.email,
    orgId: session.user?.currentOrgId,
  };

  const [appointments, error] = await getPatientAppointments({
    userId: user.id,
    orgId: user.orgId,
  });

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-sm">Manage Appointments.</p>
      </div>
      <AppointmentsTable
        appointments={appointments}
        error={error}
        user={user}
      />
    </div>
  );
}

export default AppointmentsPage;
