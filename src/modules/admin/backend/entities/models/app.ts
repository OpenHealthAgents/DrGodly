import z from "zod";

export const AppSchema = z.object({
  name: z.string(),
  id: z.string(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string().nullable(),
  type: z.enum(["custom", "platform"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const AppMenuActionCountSchema = z.object({
  _count: z.object({
    appMenuItems: z.number(),
    appActions: z.number(),
  }),
});

export const AppsWithMenuActionCountSchema = z.array(
  AppSchema.merge(AppMenuActionCountSchema)
);

export const AppDatasSchema = z.object({
  appDatas: AppsWithMenuActionCountSchema,
  total: z.number(),
});

export type App = z.infer<typeof AppSchema>;
export type AppsWithMenuActionCount = z.infer<
  typeof AppsWithMenuActionCountSchema
>;
export type AppDatas = z.infer<typeof AppDatasSchema>;

export const CreateAppSchema = AppSchema.pick({
  name: true,
  slug: true,
  description: true,
  type: true,
});
export type CreateApp = z.infer<typeof CreateAppSchema>;

export const UpdateAppSchema = CreateAppSchema.merge(
  AppSchema.pick({ id: true })
);
export type UpdateApp = z.infer<typeof UpdateAppSchema>;

export const DeleteAppSchema = z.object({
  id: z.string(),
});
export type AppDelete = z.infer<typeof DeleteAppSchema>;
