"use client";

import { motion } from "motion/react";

const SocialIcon = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    {children}
  </a>
);

const LandingPageFooter = () => {
  return (
    <motion.footer
      className="bg-[var(--color-landing-muted)]/30 border-t border-[var(--color-landing-border)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a
              href="#"
              className="flex items-center space-x-2 text-[var(--color-landing-primary)]"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C8.82 3 3 8.82 3 16C3 23.18 8.82 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3ZM22 17.5H17.5V22H14.5V17.5H10V14.5H14.5V10H17.5V14.5H22V17.5Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-2xl font-bold text-[var(--color-landing-foreground)]">
                Dr. Godly
              </span>
            </a>
            <p className="mt-4 text-[var(--color-landing-muted-foreground)] text-sm">
              The future of intelligent, seamless, and secure healthcare.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-[var(--color-landing-foreground)]">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  For Patients
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  For Doctors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-[var(--color-landing-foreground)]">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-[var(--color-landing-foreground)]">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--color-landing-muted-foreground)] hover:text-[var(--color-landing-primary)]"
                >
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-[var(--color-landing-border)] flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-[var(--color-landing-muted-foreground)]">
            &copy; {new Date().getFullYear()} Dr. Godly, Inc. All rights
            reserved.
          </p>

          <div className="flex space-x-6 mt-4 sm:mt-0 text-[var(--color-landing-primary)]">
            <SocialIcon href="#">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995.017-2.277-1.387-2.277-1.405 0-1.622 1.096-1.622 2.206v4.249H8.001v-8.22h2.556v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.336 8.905H4.002v-8.22h2.671v8.22zM17.668 1H6.329A5.332 5.332 0 001 6.332v11.336A5.332 5.332 0 006.329 23h11.339A5.332 5.332 0 0023 17.668V6.332A5.332 5.332 0 0017.668 1z"
                  clipRule="evenodd"
                />
              </svg>
            </SocialIcon>
            <SocialIcon href="#">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default LandingPageFooter;
