"use client";

import { motion, Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Sign Up & AI Intake",
    description:
      "Patients create an account and interact with our friendly AI to provide their medical history and current symptoms.",
  },
  {
    number: "02",
    title: "Doctor Review",
    description:
      "Your doctor receives an AI-generated, concise pre-visit summary, allowing for a more prepared and focused consultation.",
  },
  {
    number: "03",
    title: "Virtual Consultation",
    description:
      "Connect with your doctor through a secure, high-quality video call, enhanced with real-time AI clinical support tools.",
  },
  {
    number: "04",
    title: "Automated Follow-up",
    description:
      "AI assists in generating SOAP notes, prescriptions, and follow-up instructions, ensuring clarity and continuity of care.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function LangingPageHowItWorks() {
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
            Simple Steps to Better Care
          </h2>
          <p className="mt-4 text-lg text-landing-muted-foreground">
            We’ve designed a straightforward process to make your healthcare
            journey as smooth as possible.
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

export default LangingPageHowItWorks;
