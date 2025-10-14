import { send2FaOTPController } from "@/modules/auth/backend/interface-adapters/controllers/auth/send2FaOTP.controller";
import TwoFaForm from "@/modules/auth/components/auth/two-fa-form";

const TwoFaPage = async () => {
  return (
    <>
      <TwoFaForm />
    </>
  );
};

export default TwoFaPage;
