import z from "zod";

export const RbacSchema = z.object({
  id: z.string(),
  userId: z.string(),
  organizationId: z.string(),
  roleId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string().nullable(),
    email: z.string(),
  }),
  organization: z.object({
    id: z.string(),
    name: z.string(),
  }),
  role: z.object({
    id: z.string(),
    name: z.string(),
  }),
});
export type TRbac = z.infer<typeof RbacSchema>;

export const RbacDatasSchema = z.array(RbacSchema);
export type TRbacDatas = z.infer<typeof RbacDatasSchema>;

export const mapOrUnmapRbacUserOrganizationRoleInputSchema = RbacSchema.pick({
  userId: true,
  organizationId: true,
  roleId: true,
});
export type TMapOrUnmapRbacUserOrganizationRoleInput = z.infer<
  typeof mapOrUnmapRbacUserOrganizationRoleInputSchema
>;
