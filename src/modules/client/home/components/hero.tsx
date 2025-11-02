"use client";

import { landingButtonVariants as buttonVariants } from "./landing-page-button";
import { Link } from "@/i18n/navigation";
import { Variants, motion } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

function LandingPageHero({ session }: { session: any | null }) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]" />

      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Text Section */}
          <div className="text-center lg:text-left">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-landing-foreground tracking-tight"
            >
              The Future of Intelligent Healthcare
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg sm:text-xl text-landing-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              Dr. Godly is a secure, AI-powered platform that streamlines
              patient intake, enhances consultations, and empowers both doctors
              and patients.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
            >
              {!session ? (
                <>
                  <Link
                    href="/signin"
                    className={buttonVariants({
                      variant: "primary",
                      className:
                        "w-full sm:w-auto text-lg px-8 py-4 rounded-full shadow-lg transition-transform duration-200 hover:scale-105",
                    })}
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/signup"
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "w-full sm:w-auto text-lg px-8 py-4 rounded-full",
                    })}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link
                  href="/app"
                  className={buttonVariants({
                    variant: "primary",
                    className:
                      "w-full sm:w-auto text-lg px-8 py-4 rounded-full shadow-lg transition-transform duration-200 hover:scale-105",
                  })}
                >
                  Open App
                </Link>
              )}
            </motion.div>
          </div>

          {/* SVG Illustration */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <svg
              viewBox="0 0 500 420"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="500"
                height="420"
                rx="20"
                className="fill-landing-muted/30"
              />
              <rect
                x="15"
                y="15"
                width="470"
                height="390"
                rx="10"
                className="fill-landing-background"
              />

              {/* Sidebar */}
              <rect
                x="30"
                y="30"
                width="120"
                height="360"
                rx="5"
                className="fill-landing-muted/50"
              />
              <rect
                x="40"
                y="45"
                width="100"
                height="10"
                rx="5"
                className="fill-landing-muted-foreground/20"
              />
              <rect
                x="40"
                y="65"
                width="60"
                height="10"
                rx="5"
                className="fill-landing-muted-foreground/10"
              />

              {/* Primary progress bars */}
              <rect
                x="40"
                y="100"
                width="100"
                height="8"
                rx="4"
                className="fill-landing-primary/30"
              />
              <rect
                x="40"
                y="115"
                width="100"
                height="8"
                rx="4"
                className="fill-landing-primary"
              />
              <rect
                x="40"
                y="130"
                width="70"
                height="8"
                rx="4"
                className="fill-landing-primary/30"
              />

              {/* Top card */}
              <rect
                x="165"
                y="30"
                width="305"
                height="60"
                rx="5"
                className="fill-landing-muted/50"
              />
              <circle
                cx="190"
                cy="60"
                r="15"
                className="fill-landing-avatar-1-bg"
              />
              <rect
                x="220"
                y="50"
                width="120"
                height="8"
                rx="4"
                className="fill-landing-muted-foreground/30"
              />
              <rect
                x="220"
                y="65"
                width="80"
                height="8"
                rx="4"
                className="fill-landing-muted-foreground/10"
              />

              {/* Left graph */}
              <rect
                x="165"
                y="105"
                width="145"
                height="150"
                rx="5"
                className="fill-landing-muted/50"
              />
              <rect
                x="175"
                y="120"
                width="125"
                height="8"
                rx="4"
                className="fill-landing-primary"
              />
              <rect
                x="175"
                y="135"
                width="80"
                height="8"
                rx="4"
                className="fill-landing-primary/50"
              />
              <path
                d="M175 160 C 195 190, 240 150, 260 175 C 280 200, 270 220, 300 230"
                className="stroke-landing-secondary"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />

              {/* Right graph */}
              <rect
                x="325"
                y="105"
                width="145"
                height="150"
                rx="5"
                className="fill-landing-muted/50"
              />
              <rect
                x="335"
                y="120"
                width="125"
                height="8"
                rx="4"
                className="fill-landing-muted-foreground/20"
              />
              <rect
                x="335"
                y="135"
                width="80"
                height="8"
                rx="4"
                className="fill-landing-muted-foreground/10"
              />
              <rect
                x="345"
                y="160"
                width="20"
                height="80"
                rx="5"
                className="fill-landing-secondary/60"
              />
              <rect
                x="375"
                y="180"
                width="20"
                height="60"
                rx="5"
                className="fill-landing-secondary/60"
              />
              <rect
                x="405"
                y="150"
                width="20"
                height="90"
                rx="5"
                className="fill-landing-secondary/60"
              />

              {/* Footer card */}
              <rect
                x="165"
                y="270"
                width="305"
                height="120"
                rx="5"
                className="fill-landing-muted/50"
              />
              <rect
                x="175"
                y="285"
                width="285"
                height="8"
                rx="4"
                className="fill-landing-muted-foreground/30"
              />
              <rect
                x="175"
                y="300"
                width="200"
                height="8"
                rx="4"
                className="fill-landing-muted-foreground/20"
              />
              <rect
                x="400"
                y="340"
                width="60"
                height="30"
                rx="8"
                className="fill-landing-primary"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingPageHero;
