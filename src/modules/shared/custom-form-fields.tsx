import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";

interface IFormFields {
  type: "input" | "select" | "checkbox" | "switch" | "radio" | "textarea";
  control: Control<any>;
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  inputType?: "text" | "email" | "password" | "date" | "number";
  selectList?: { label: any; value: string }[];
  defaultValue?: any;
  formItemClassName?: string;
  className?: string;
  dateMin?: string;
  disable?: boolean;
}

export function customFormField(props: IFormFields) {
  const { control, name, label } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <RenderInput field={field} fieldState={fieldState} props={props} />
        </Field>
      )}
    />
  );
}

export function RenderInput({
  field,
  fieldState,
  props,
}: {
  field: ControllerRenderProps<any, string>;
  fieldState: ControllerFieldState;
  props: IFormFields;
}) {
  switch (props.type) {
    case "input":
      return (
        <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
      );
  }
}
