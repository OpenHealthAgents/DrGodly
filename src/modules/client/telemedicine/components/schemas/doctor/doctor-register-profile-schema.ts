import z from "zod";

export const DoctorPersonalDetailsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  fullName: z.string().min(1, "Full name is required"),
  nationality: z.string().min(1, "Nationality is required"),
  languagesSpoken: z.array(z.string()).min(1, "Select at least one language"),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  gender: z.string().min(1, "Gender is required"),
  // fatherName: z.string().min(1, "Father's name is required"),
  kycAddress: z.object({
    careOf: z.string().min(1, "Care of is required"),
    addressLine: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    district: z.string().min(1, "District is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
  }),
  communicationAddress: z.object({
    sameAsKyc: z.boolean(),
    careOf: z.string().optional(),
    addressLine: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
  }),
  mobileNumber: z.string().regex(/^\+91\s\d{10}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
});
export type TDoctorPersonalDetails = z.infer<
  typeof DoctorPersonalDetailsSchema
>;

const qualificationSchema = z.object({
  id: z.string(),
  countryOfQualification: z.string().min(1, "Country is required"),
  degreeName: z.string().min(1, "Degree name is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  college: z.string().min(1, "College is required"),
  university: z.string().min(1, "University is required"),
  passingMonth: z.string().min(1, "Month is required"),
  passingYear: z.string().min(1, "Year is required"),
  nameMatchesAadhaar: z.boolean(),
});

export const DoctorQualificationsSchema = z
  .object({
    systemOfMedicine: z.string().min(1, "System of medicine is required"),
    category: z.string().min(1, "Category is required"),
    councilName: z.string().min(1, "Council name is required"),
    registrationNumber: z.string().min(1, "Registration number is required"),
    dateOfFirstRegistration: z.date({
      required_error: "Registration date is required",
    }),
    registrationType: z.enum(["permanent", "renewal"]),
    registrationValidDate: z.date().optional(),
    nameMatchesAadhaar: z.boolean(),
    qualifications: z
      .array(qualificationSchema)
      .min(1, "Add at least one qualification"),
  })
  .refine(
    (data) =>
      data.registrationType === "permanent" ||
      (data.registrationType === "renewal" && data.registrationValidDate),
    {
      message: "Registration valid date is required for renewal type",
      path: ["registrationValidDate"],
    }
  );
export type TDoctorQualifications = z.infer<typeof DoctorQualificationsSchema>;

export const doctorWorkingFacilityDetailSchema = z.object({
  id: z.string(),
  facilityId: z.string().min(1, { message: "Facility Id is required" }),
  facilityStatus: z.boolean(),
  facilityName: z.string().min(1, { message: "Facility name is required" }),
  address: z.string().min(1, { message: "Facility address is required" }),
  state: z.string().min(1, { message: "State is required" }),
  district: z.string().min(1, { message: "State is required" }),
  type: z.string().min(1, { message: "Facility type is required" }),
  department: z.string().min(1, { message: "Working department is required" }),
  designation: z
    .string()
    .min(1, { message: "Working designation is required" }),
});
export type TDoctorWorkingFacilityDetail = z.infer<
  typeof doctorWorkingFacilityDetailSchema
>;

const workStatus = ["government", "private", "both"] as const;

export const DoctorWorkDetailsSchema = z
  .object({
    currentlyWorking: z.boolean(),
    reasonForNotWorking: z.string().optional(),
    otherReason: z.string().optional(),

    natureOfWork: z.string().optional(),
    teleConsultationURL: z.string().optional(),
    workStatus: z.enum(workStatus).optional(),

    governmentCategory: z.enum(["central", "state"]).optional(),
    centralGovernment: z.string().optional(),

    workingFacilityDetails: z
      .array(doctorWorkingFacilityDetailSchema)
      .optional(),

    about: z
      .string()
      .min(50, "About section should be at least 50 characters")
      .max(1000, "About section should not exceed 1000 characters"),
  })
  .superRefine((data, ctx) => {
    // 1️⃣ currentlyWorking = false → reasonForNotWorking required
    if (!data.currentlyWorking && !data.reasonForNotWorking) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Reason for not working is required",
        path: ["reasonForNotWorking"],
      });
    }

    // 2️⃣ reasonForNotWorking = "other" → otherReason required
    if (
      !data.currentlyWorking &&
      data.reasonForNotWorking === "other" &&
      !data.otherReason
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify the reason",
        path: ["otherReason"],
      });
    }

    // 3️⃣ currentlyWorking = true → natureOfWork & workStatus required
    if (data.currentlyWorking) {
      if (!data.natureOfWork) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Nature of work is required when currently working",
          path: ["natureOfWork"],
        });
      }

      if (!data.workStatus) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Work status is required when currently working",
          path: ["workStatus"],
        });
      }
    }

    // 4️⃣ If workStatus = government or both → governmentCategory required
    if (data.workStatus === "government" || data.workStatus === "both") {
      if (!data.governmentCategory) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Government category is required",
          path: ["governmentCategory"],
        });
      }

      // 5️⃣ If governmentCategory = central → centralGovernment required
      if (data.governmentCategory === "central" && !data.centralGovernment) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Central government department is required",
          path: ["centralGovernment"],
        });
      }
    }

    // 6️⃣ For any workStatus (government/private/both)
    // workingFacilityDetails must contain at least one entry
    if (
      !data.workingFacilityDetails ||
      data.workingFacilityDetails.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one working facility detail is required",
        path: ["workingFacilityDetails"],
      });
    }
  });

export type TDoctorWorkDetails = z.infer<typeof DoctorWorkDetailsSchema>;
