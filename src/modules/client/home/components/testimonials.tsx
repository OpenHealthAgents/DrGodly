"use client";

import { motion, Variants } from "framer-motion";
import { UserRound, Stethoscope, HeartPulse } from "lucide-react";
const testimonialIcons = [UserRound, Stethoscope, HeartPulse];

const testimonials = [
  {
    quote:
      "Dr. Godly's AI intake has saved me hours of paperwork each week. I can finally focus more on my patients.",
    name: "Dr. Anya Sharma",
    title: "General Practitioner",
    // avatar: <Avatar1 />,
  },
  {
    quote:
      "As a patient, booking appointments and managing my records has never been easier. The platform is so intuitive and secure.",
    name: "John Doe",
    title: "Patient",
    // avatar: <Avatar2 />,
  },
  {
    quote:
      "The seamless integration and AI-powered summaries are game-changers for our clinic. Patient outcomes have visibly improved.",
    name: "Maria Garcia",
    title: "Clinic Administrator",
    // avatar: <Avatar3 />,
  },
];

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
            Trusted by Patients and Professionals
          </h2>
          <p className="mt-4 text-lg text-landing-muted-foreground">
            Hear what people are saying about their experience with Dr. Godly.
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
