"use client";

import { useState } from "react";
import {
  TDoctorPersonalDetails,
  TDoctorQualifications,
  TDoctorWorkDetails,
} from "../schemas/doctor/doctor-register-profile-schema";
import { toast } from "sonner";
import { StepProgressBar } from "./step-progress-bar";
import { PersonalDetailsStep } from "./steps/personalDetailsStep";
import { QualificationStep } from "./steps/qualificationStep";
import { WorkDetailsStep } from "./steps/workDetailsStep";
import { PreviewStep } from "./steps/previewStep";

export interface DoctoeProfileData {
  personalDetails?: TDoctorPersonalDetails;
  qualificationDetails?: TDoctorQualifications;
  workDetails?: TDoctorWorkDetails;
  completed: boolean;
}

function DoctorProfileAndRegister() {
  const [currentStep, setCurrentStep] = useState(3);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [profileData, setProfileData] = useState<DoctoeProfileData>({
    completed: false,
  });

  const handleStepComplete = (step: number, data: any) => {
    setProfileData((prev) => ({
      ...prev,
      ...(step === 1 && { personalDetails: data }),
      ...(step === 2 && { qualificationDetails: data }),
      ...(step === 3 && { workDetails: data }),
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
