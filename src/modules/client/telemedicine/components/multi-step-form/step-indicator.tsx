"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          <motion.div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
              index <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
            initial={false}
            animate={{
              scale: index === currentStep ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
          </motion.div>

          {index < steps.length - 1 && (
            <motion.div
              className="flex-1 h-1 mx-2 bg-secondary"
              initial={{ backgroundColor: "var(--secondary)" }}
              animate={{
                backgroundColor:
                  index < currentStep ? "var(--primary)" : "var(--secondary)",
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
