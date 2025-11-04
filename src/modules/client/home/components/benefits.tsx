"use client";

import { motion } from "framer-motion";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-[hsl(var(--color-landing-secondary))]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const patientBenefits = [
  "Save time with automated pre-visit intake.",
  "Receive more focused and prepared care.",
  "Access doctors from the comfort of your home.",
  "Manage all your medical data securely.",
];

const doctorBenefits = [
  "Reduce administrative workload significantly.",
  "Access comprehensive patient summaries.",
  "Conduct efficient and effective consultations.",
  "Improve overall workflow and patient outcomes.",
];

function LangingPageBenefits() {
  return (
    <section className="py-20 sm:py-28 bg-landing-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Patient Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-foreground">
              Empowering Patients
            </h2>
            <p className="mt-4 text-lg text-landing-muted-foreground">
              Take control of your health with a platform designed around you.
              Experience convenience, clarity, and care like never before.
            </p>
            <ul className="mt-8 space-y-4">
              {patientBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-landing-primary">
                    <CheckIcon />
                  </div>
                  <span className="ml-3 text-lg text-landing-foreground">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Doctor Section */}
          <motion.div
            className="p-8 lg:p-12 bg-landing-muted/40 rounded-2xl border border-landing-border shadow-sm"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-foreground">
              Optimizing for Doctors
            </h2>
            <p className="mt-4 text-lg text-landing-muted-foreground">
              Focus on what matters most—your patients. Let our AI handle the
              administrative tasks and provide you with actionable insights.
            </p>
            <ul className="mt-8 space-y-4">
              {doctorBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-landing-secondary">
                    <CheckIcon />
                  </div>
                  <span className="ml-3 text-lg text-landing-foreground">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LangingPageBenefits;
