"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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

function LandingPageBenefits() {
  const t = useTranslations("landing.benefits");

  const patientBenefits = [
    t("patients.items.0"),
    t("patients.items.1"),
    t("patients.items.2"),
    t("patients.items.3"),
  ];

  const doctorBenefits = [
    t("doctors.items.0"),
    t("doctors.items.1"),
    t("doctors.items.2"),
    t("doctors.items.3"),
  ];

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
              {t("patients.title")}
            </h2>
            <p className="mt-4 text-lg text-landing-muted-foreground">
              {t("patients.description")}
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
              {t("doctors.title")}
            </h2>
            <p className="mt-4 text-lg text-landing-muted-foreground">
              {t("doctors.description")}
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

export default LandingPageBenefits;
