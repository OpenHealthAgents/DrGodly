import z from "zod";

export const AppDTOSchema = z.object({
  name: z.string(),
  id: z.string(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string().nullable(),
  type: z.enum(["custom", "platform"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AppMenuActionCountDTOSchema = z.object({
  _count: z.object({
    appMenuItems: z.number(),
    appActions: z.number(),
  }),
});

export const AppsWithMenuActionCountDTOSchema = z.array(
  AppDTOSchema.merge(AppMenuActionCountDTOSchema)
);

export const AppDatasDTOSchema = z.object({
  appDatas: AppsWithMenuActionCountDTOSchema,
  total: z.number(),
});

export type AppsWithMenuActionCountDTO = z.infer<
  typeof AppsWithMenuActionCountDTOSchema
>;
export type AppDatasDTO = z.infer<typeof AppDatasDTOSchema>;
