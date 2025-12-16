import z from "zod";

export const orgIdSchema = z.object({
  orgId: z.string(),
});
