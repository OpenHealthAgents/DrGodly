"use client";

import { motion, Variants } from "framer-motion";
import { UserRound, Stethoscope, HeartPulse } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonialIcons = [UserRound, Stethoscope, HeartPulse];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

function LandingPageTestimonials() {
  const t = useTranslations("landing.testimonials");

  const testimonials = [
    {
      quote: t("items.0.quote"),
      name: t("items.0.name"),
      title: t("items.0.title"),
    },
    {
      quote: t("items.1.quote"),
      name: t("items.1.name"),
      title: t("items.1.title"),
    },
    {
      quote: t("items.2.quote"),
      name: t("items.2.name"),
      title: t("items.2.title"),
    },
  ];

  return (
    <motion.section
      id="testimonials"
      className="py-20 sm:py-28 bg-landing-muted/30"
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

        {/* Testimonials */}
        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3"
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => {
            const Icon = testimonialIcons[index % testimonialIcons.length];
            return (
              <motion.div
                key={testimonial.name}
                className="p-8 bg-landing-background rounded-2xl border border-landing-border flex flex-col transition-all duration-300 hover:shadow-lg"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <p className="text-landing-muted-foreground flex-grow">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-landing-primary/10 border border-landing-primary/30 flex items-center justify-center">
                      <Icon className="text-landing-primary" size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-landing-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-landing-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default LandingPageTestimonials;
