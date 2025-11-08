"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function LandingPageHowItWorks() {
  const t = useTranslations("landing.howItWorks");

  const steps = [
    {
      number: "01",
      title: t("steps.0.title"),
      description: t("steps.0.description"),
    },
    {
      number: "02",
      title: t("steps.1.title"),
      description: t("steps.1.description"),
    },
    {
      number: "03",
      title: t("steps.2.title"),
      description: t("steps.2.description"),
    },
    {
      number: "04",
      title: t("steps.3.title"),
      description: t("steps.3.description"),
    },
  ];

  return (
    <motion.section
      id="how-it-works"
      className="py-20 sm:py-28 bg-landing-muted/30 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-landing-foreground">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-landing-muted-foreground">
            {t("description")}
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative mt-20">
          {/* Timeline line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-landing-primary/20 rounded-full lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
            style={{ originY: 0 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Step items */}
          <motion.div
            className="relative flex flex-col items-start gap-y-12"
            variants={containerVariants}
          >
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`w-full flex items-start gap-6 lg:w-1/2 ${
                    isEven
                      ? "lg:self-start lg:pr-12"
                      : "lg:self-end lg:flex-row-reverse lg:pl-12"
                  }`}
                >
                  {/* Step Circle */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-16 h-16 bg-landing-background border-2 border-landing-primary rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-landing-primary">
                        {step.number}
                      </span>
                    </div>
                  </motion.div>

                  {/* Step Content */}
                  <div className={`pt-2 ${!isEven ? "lg:text-right" : ""}`}>
                    <h3 className="text-xl font-bold text-landing-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-landing-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default LandingPageHowItWorks;
