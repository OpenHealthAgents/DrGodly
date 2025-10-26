import z from "zod";

export const OrganizationAppSchema = z.object({
  appId: z.string(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  app: z.object({
    type: z.enum(["custom", "platform"]),
    name: z.string(),
    id: z.string(),
    description: z.string(),
    slug: z.string(),
  }),
});
export type TOrganizationApp = z.infer<typeof OrganizationAppSchema>;

export const OrganizationAppsSchema = z.array(OrganizationAppSchema);
export type TOrganizationApps = z.infer<typeof OrganizationAppsSchema>;
