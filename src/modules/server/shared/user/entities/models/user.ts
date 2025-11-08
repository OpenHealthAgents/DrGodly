import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type TUser = z.infer<typeof UserSchema>;

export type TUserUniqueFields = {
  email?: string;
  username?: string;
};
