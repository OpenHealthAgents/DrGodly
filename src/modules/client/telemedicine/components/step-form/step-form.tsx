"use client";

import { useState } from "react";
import {
  TDoctorConcent,
  TDoctorPersonalDetails,
  TDoctorQualifications,
  TDoctorWorkDetails,
} from "../../../../../modules/shared/schemas/telemedicine/doctorProfile/doctorProfileValidationSchema";
import { toast } from "sonner";
import { StepProgressBar } from "./step-progress-bar";
import { PersonalDetailsStep } from "./steps/personalDetailsStep";
import { QualificationStep } from "./steps/qualificationStep";
import { WorkDetailsStep } from "./steps/workDetailsStep";
import { PreviewStep } from "./steps/previewStep";
import { TDoctor } from "@/modules/shared/entities/models/telemedicine/doctorProfile";
import { useServerAction } from "zsa-react";
import { createOrUpdateDoctorPersonalDetails } from "../../server-actions/doctorProfile-actions/doctorProfile-actions";

export interface DoctorProfileData {
  personalDetails?: TDoctorPersonalDetails;
  qualificationDetails?: TDoctorQualifications;
  workDetails?: TDoctorWorkDetails;
  doctorConcent?: TDoctorConcent;
  completed: boolean;
}

type TUser = {
  id: string;
  name: string;
  username?: string | null;
  currentOrgId?: string | null;
};

function DoctorProfileAndRegister({
  doctorData,
  id,
  user,
}: {
  doctorData: TDoctor | null;
  id: string;
  user: TUser;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [profileData, setProfileData] = useState<DoctorProfileData>({
    completed: false,
  });

  const { execute, error, isPending } = useServerAction(
    createOrUpdateDoctorPersonalDetails,
    {
      onSuccess() {
        toast.success("Personal details updated successfully");
      },
    }
  );

  console.log({ error });

  const handleStepComplete = async (step: number, data: any) => {
    if (step === 1) {
      await execute({
        ...data,
        id: doctorData?.personal?.id ?? null,
        doctorId: id,
        operationBy: user.id,
        orgId: user.currentOrgId,
      });
    }

    setProfileData((prev) => ({
      ...prev,
      ...(step === 1 && { personalDetails: data }),
      ...(step === 2 && { qualificationDetails: data }),
      ...(step === 3 && { workDetails: data }),
      ...(step === 4 && { doctorConcent: data }),
    }));

    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step].sort());
    }

    if (step < 4) {
      setCurrentStep(step + 1);
    }
  };

  const handleSaveDraft = (data: any) => {
    toast.success("Draft saved successfully");
    console.log("Draft saved:", data);
  };

  const handleSubmit = () => {
    setProfileData((prev) => ({ ...prev, completed: true }));
    toast.success("Profile submitted successfully!", {
      description: "Your profile has been sent for verification.",
    });
    console.log("Final profile data:", profileData);
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="space-y-8">
      <StepProgressBar
        currentStep={currentStep}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
      />

      <div>
        {currentStep === 1 && (
          <PersonalDetailsStep
            data={profileData.personalDetails}
            onNext={(data) => handleStepComplete(1, data)}
            onSaveDraft={handleSaveDraft}
            profileData={doctorData?.personal}
          />
        )}

        {currentStep === 2 && (
          <QualificationStep
            data={profileData.qualificationDetails}
            onNext={(data) => handleStepComplete(2, data)}
            onPrevious={() => setCurrentStep(1)}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 3 && (
          <WorkDetailsStep
            data={profileData.workDetails}
            onNext={(data) => handleStepComplete(3, data)}
            onPrevious={() => setCurrentStep(2)}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 4 && (
          <PreviewStep
            data={profileData}
            onPrevious={() => setCurrentStep(3)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default DoctorProfileAndRegister;
