"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { type FormData, formSchema, steps } from "./schema/form-schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "./progress-bar";
import { StepIndicator } from "./step-indicator";
import { PersonalInfoStep } from "./steps/personal-info-step";
import { AddressStep } from "./steps/address-step";
import { ProfessionalStep } from "./steps/professional-step";
import { PreferencesStep } from "./steps/preferences-step";
import { SuccessMessage } from "./success-message";

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      company: "",
      jobTitle: "",
      experience: undefined,
      newsletter: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (currentStep === steps.length - 1) {
      setFormData(data);
      setIsSubmitted(true);
      console.log("Form submitted:", data);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isSubmitted && formData) {
    return <SuccessMessage data={formData} />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep form={form} />;
      case 1:
        return <AddressStep form={form} />;
      case 2:
        return <ProfessionalStep form={form} />;
      case 3:
        return <PreferencesStep form={form} />;
      default:
        return null;
    }
  };

  const isStepComplete = form.formState.isValid;

  return (
    <div className="w-full max-w-2xl">
      <Card className="p-8">
        {/* Progress Bar */}
        <ProgressBar progress={progress} />

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} steps={steps} />

        {/* Step Content */}
        <div className="mt-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {steps[currentStep].label}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {steps[currentStep].description}
                </p>
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex gap-3 pt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex-1 bg-transparent"
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isStepComplete}
                    className="flex-1"
                  >
                    {currentStep === steps.length - 1 ? "Complete" : "Next"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
