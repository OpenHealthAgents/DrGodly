import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().regex(/^\d{5}(?:-\d{4})?$/, "Invalid ZIP code"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  experience: z.enum(["0-2", "2-5", "5-10", "10+"], {
    errorMap: () => ({ message: "Please select experience level" }),
  }),
  newsletter: z.boolean().default(false),
});

export type FormData = z.infer<typeof formSchema>;

export const steps = [
  {
    id: "personal",
    label: "Personal Info",
    description: "Basic information",
    fields: ["firstName", "lastName", "email", "phone"],
  },
  {
    id: "address",
    label: "Address",
    description: "Where do you live?",
    fields: ["address", "city", "state", "zipCode"],
  },
  {
    id: "professional",
    label: "Professional",
    description: "Career details",
    fields: ["company", "jobTitle", "experience"],
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Final touches",
    fields: ["newsletter"],
  },
];
