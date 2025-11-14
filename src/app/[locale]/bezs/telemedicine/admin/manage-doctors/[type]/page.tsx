import DoctorProfileAndRegister from "@/modules/client/telemedicine/components/step-form/step-form";
import { getDoctorDataById } from "@/modules/client/telemedicine/server-actions/doctorProfile-actions/doctorProfile-actions";
import { getServerSession } from "@/modules/server/auth/betterauth/auth-server";
import { notFound } from "next/navigation";

async function TelemedicineAdminCreateDoctorPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await getServerSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const { type } = await params;
  const id = (await searchParams)?.id;
  const allowedTypes = ["create", "edit"];

  if (!allowedTypes.includes(type)) {
    notFound();
  }

  if (!id) {
    return (
      <div className="text-center">
        <h1>Doctor profile Id is missing.</h1>
      </div>
    );
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    username: session.user.username,
    currentOrgId: session.user.currentOrgId,
  };

  const [data, error] = await getDoctorDataById({ id });

  return (
    <div>
      <DoctorProfileAndRegister
        doctorData={data}
        id={id}
        user={user}
        isUpdate={type === "edit"}
      />
    </div>
  );
}

export default TelemedicineAdminCreateDoctorPage;
