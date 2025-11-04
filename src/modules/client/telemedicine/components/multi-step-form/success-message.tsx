"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FormData } from "./schema/form-schema";

interface SuccessMessageProps {
  data: FormData;
}

export function SuccessMessage({ data }: SuccessMessageProps) {
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="mb-6 flex justify-center"
          >
            <CheckCircle className="w-16 h-16 text-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Success!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for completing the form. Your information has been
              submitted successfully.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-secondary rounded-lg p-6 mb-8 text-left space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">
                    {data.firstName} {data.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{data.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-semibold text-foreground">
                    {data.company}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-semibold text-foreground">
                    {data.experience} years
                  </p>
                </div>
              </div>
            </motion.div>

            <Button onClick={handleReset} className="w-full md:w-auto">
              Submit Another Form
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
