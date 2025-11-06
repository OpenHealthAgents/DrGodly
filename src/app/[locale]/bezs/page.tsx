"use client";

import { useSession } from "@/modules/client/auth/betterauth/auth-client";
import {
  FormCheckbox,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSlider,
  FormSwitch,
  FormTextarea,
} from "@/modules/shared/custom-form-fields";
import { useTranslations } from "next-intl";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { RadioGroupItem } from "@/components/ui/radio-group";

export const PROJECT_STATUSES = ["draft", "active", "finished"] as const;
const projectSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z
    .string()
    .optional()
    .transform((v) => v || undefined),
  status: z.enum(PROJECT_STATUSES),
  notifications: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    push: z.boolean(),
  }),
  users: z
    .array(z.object({ email: z.string().email() }))
    .min(1)
    .max(5),
  type: z.enum(["private", "public"]),
  budget: z.number().min(0).max(100),
});
// .superRefine((data, ctx) => {
//   const { email, sms, push } = data.notifications;
//   if (!email)
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Email notifications must be enabled.",
//       path: ["notifications", "email"],
//     });
//   if (!sms)
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "SMS notifications must be enabled.",
//       path: ["notifications", "sms"],
//     });
//   if (!push)
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "Push notifications must be enabled.",
//       path: ["notifications", "push"],
//     });
// });

type TProject = z.infer<typeof projectSchema>;

const BezsPage = () => {
  const { data } = useSession();
  console.log(data);

  async function getLocation() {
    const res = await fetch("https://ipapi.co/json/");
    const location = await res.json();
    console.log(location);
  }

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "draft" as const,
      notifications: {
        email: false,
        push: false,
        sms: false,
      },
      users: [{ email: "" }],
      type: "public",
      budget: 0,
    },
  });

  const {
    fields: users,
    append: addUser,
    remove: removeUser,
  } = useFieldArray({
    control: form.control,
    name: "users",
  });

  const statusList = PROJECT_STATUSES.map((status) => ({
    label: status,
    value: status,
  }));

  function onSubmit(data: TProject) {
    console.log(data);
    form.reset();
  }

  const budget = form.watch("budget");

  return (
    <div className="h-full p-4">
      <h1>Bezs</h1>
      <Button onClick={getLocation}>Get Location</Button>
      {/* <div className="px-4 mx-auto my-6">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput control={form.control} label="Name" name="name" />

            <FormSelect control={form.control} name="status" label="Status">
              {PROJECT_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </FormSelect>

            <FormTextarea
              control={form.control}
              label="Description"
              name="description"
              description="Be as specific as possible"
            />

            <FieldSet>
              <FieldContent>
                <FieldLegend>Notification</FieldLegend>
                <FieldDescription>
                  Select how would like to receive notifications.
                </FieldDescription>
              </FieldContent>

              <FieldGroup data-slot="checkbox-group">
                <FormCheckbox
                  control={form.control}
                  label="Email"
                  name="notifications.email"
                />
                <FormCheckbox
                  control={form.control}
                  label="Text"
                  name="notifications.sms"
                />
                <FormCheckbox
                  control={form.control}
                  label="In App"
                  name="notifications.push"
                />
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FormRadioGroup
              control={form.control}
              label="Type"
              name="type"
              description="Choose your project type"
            >
              <Field orientation="horizontal">
                <RadioGroupItem value="public" id="push" />
                <FieldLabel htmlFor="push">Public</FieldLabel>
              </Field>

              <Field orientation="horizontal">
                <RadioGroupItem value="private" id="email" />
                <FieldLabel htmlFor="email">Private</FieldLabel>
              </Field>
            </FormRadioGroup>

            <FieldSeparator />

            <FormSwitch
              control={form.control}
              label="Email"
              name="notifications.email"
            />

            <FieldSeparator />

            <FormSlider
              control={form.control}
              name="budget"
              label={`Budget ($${budget})`}
              min={0}
              max={100}
              step={5}
            />

            <FieldSeparator />

            <FieldSet>
              <div className="flex justify-between gap-2 items-center">
                <FieldContent>
                  <FieldLegend variant="label" className="mb-0">
                    User Email Addresses
                  </FieldLegend>
                  <FieldDescription>
                    Add up to 5 users to this project (including yourself)
                  </FieldDescription>
                  {form.formState.errors.users?.root && (
                    <FieldError errors={[form.formState.errors.users?.root]} />
                  )}
                </FieldContent>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addUser({ email: "" })}
                >
                  Add User
                </Button>
              </div>

              <FieldGroup>
                {users.map((user, index) => {
                  return (
                    <FormInput
                      control={form.control}
                      key={user.id}
                      name={`users.${index}.email`}
                    />
                  );
                })}
              </FieldGroup>
            </FieldSet>

            <Button>Create</Button>
          </FieldGroup>
        </form>
      </div> */}
    </div>
  );
};

export default BezsPage;
