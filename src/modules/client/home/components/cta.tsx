"use client";

import { Link } from "@/i18n/navigation";
import { motion, Variants } from "framer-motion";
import { landingButtonVariants as buttonVariants } from "./landing-page-button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function LangingPageCTA({ session }: { session: any | null }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-landing-primary text-landing-primary-foreground p-12 sm:p-16 rounded-3xl shadow-xl">
          {/* Decorative background blur */}
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute -right-40 -top-40 w-96 h-96 bg-landing-primary-foreground/5 rounded-full filter blur-3xl opacity-50" />
            <div className="absolute -left-60 -bottom-20 w-80 h-80 bg-landing-primary-foreground/5 rounded-full filter blur-3xl opacity-50" />
          </div>

          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-extrabold"
            >
              Ready to Transform Your Healthcare Experience?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg text-landing-primary-foreground/80"
            >
              Join the growing number of forward-thinking healthcare providers
              and patients who are choosing a smarter, more efficient way to
              manage health.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex justify-center"
            >
              {!session ? (
                <Link
                  href="/signup"
                  className={buttonVariants({
                    variant: "primary",
                    className:
                      "bg-landing-background text-landing-primary hover:bg-landing-muted px-8 py-4 rounded-full font-semibold shadow-lg transition-transform duration-200 hover:scale-105 text-lg",
                  })}
                >
                  Sign Up
                </Link>
              ) : (
                <Link
                  href="/app"
                  className={buttonVariants({
                    variant: "primary",
                    className:
                      "bg-landing-background text-landing-primary hover:bg-landing-muted px-8 py-4 rounded-full font-semibold shadow-lg transition-transform duration-200 hover:scale-105 text-lg",
                  })}
                >
                  Open App
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LangingPageCTA;
