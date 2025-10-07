import z from "zod";
import { createAppFormSchema, editAppFormSchema } from "./app-schemas";

export type TCreateAppFormSchema = z.infer<typeof createAppFormSchema>;
export type TEditAppFormSchemaType = z.infer<typeof editAppFormSchema>;
