import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProfileSidebarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

const steps: Step[] = [
  {
    id: 1,
    title: "Personal Details",
    description: "Basic information and contact details",
  },
  {
    id: 2,
    title: "Qualifications & Registration",
    description: "Medical credentials and licenses",
  },
  {
    id: 3,
    title: "Work Details",
    description: "Professional experience and status",
  },
  {
    id: 4,
    title: "Preview & Submit",
    description: "Review your profile information",
  },
];

export function StepProgressBar({
  currentStep,
  onStepClick,
  completedSteps,
}: ProfileSidebarProps) {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          Doctor Profile Registration
        </h1>
        <p className="text-muted-foreground">
          Complete your professional profile for ABDM Provider Registry
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isAccessible = step.id <= currentStep || isCompleted;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => isAccessible && onStepClick(step.id)}
                disabled={!isAccessible}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-lg transition-all flex-1",
                  isCurrent && "bg-primary/10",
                  !isCurrent && isAccessible && "hover:bg-accent",
                  !isAccessible && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center justify-center">
                  {isCompleted ? (
                    <Check className="w-8 h-8 text-success" />
                  ) : (
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold",
                        isCurrent
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground text-muted-foreground"
                      )}
                    >
                      {step.id}
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      "font-medium text-sm",
                      isCurrent ? "text-primary" : "text-foreground"
                    )}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-full flex-1 transition-colors",
                    isCompleted ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium text-foreground">
            {completedSteps.length} of {steps.length} completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-primary transition-all duration-500 ease-out"
            style={{
              width: `${(completedSteps.length / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
