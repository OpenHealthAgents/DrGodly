import z from "zod";

export const OrganizationMemberAndUserSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
  }),
});
export type TOrganizationMemberAndUser = z.infer<
  typeof OrganizationMemberAndUserSchema
>;

export const OrganizationMembersAndUsersSchema = z.array(
  OrganizationMemberAndUserSchema
);
export type TOrganizationMembersAndUsers = z.infer<
  typeof OrganizationMembersAndUsersSchema
>;

export const AddMemberToOrganizationSchema =
  OrganizationMemberAndUserSchema.pick({
    organizationId: true,
    userId: true,
  });
export type TAddMemberToOrganization = z.infer<
  typeof AddMemberToOrganizationSchema
>;

export const RemoveMemberFromOrganizationSchema =
  OrganizationMemberAndUserSchema.pick({
    id: true,
    organizationId: true,
    userId: true,
  });
export type TRemoveMemberFromOrganization = z.infer<
  typeof RemoveMemberFromOrganizationSchema
>;

export type TAddMemberToOrganizationUseCase = {
  organizationId: string;
  email?: string;
  username?: string;
};
