import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = {
  name: TName;
  label?: React.ReactNode;
  description?: React.ReactNode;
  control: ControllerProps<TFieldValues, TName, TTransformedValues>["control"];
};

type TFormBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = FormControlProps<TFieldValues, TName, TTransformedValues> & {
  horizontal?: boolean;
  controlFirst?: boolean;
  children: (
    field: Parameters<
      ControllerProps<TFieldValues, TName, TTransformedValues>["render"]
    >[0]["field"] & { "aria-invalid": boolean; id: string }
  ) => React.ReactNode;
};

type TFormControlFunc<
  ExtraProps extends Record<string, unknown> = Record<never, never>
> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>(
  props: FormControlProps<TFieldValues, TName, TTransformedValues> &
    ExtraProps & { className?: string; placeholder?: string }
) => React.ReactNode;

function FormBase<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  children,
  control,
  label,
  name,
  description,
  controlFirst,
  horizontal,
}: TFormBaseProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </>
        );

        const control = children({
          ...field,
          id: field.name,
          "aria-invalid": fieldState.invalid,
        });

        const errorElem = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        );

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={horizontal ? "horizontal" : undefined}
            className="gap-2"
          >
            {controlFirst ? (
              <>
                {control}
                <FieldContent>
                  {labelElement}
                  {errorElem}
                </FieldContent>
              </>
            ) : (
              <>
                <FieldContent>{labelElement}</FieldContent>
                {control}
                {errorElem}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}

export const FormInput: TFormControlFunc = ({
  className,
  placeholder,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <Input
          {...field}
          value={field.value ?? ""}
          placeholder={placeholder}
          className={className}
        />
      )}
    </FormBase>
  );
};

export const FormTextarea: TFormControlFunc = ({
  className,
  placeholder,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <Textarea {...field} className={className} placeholder={placeholder} />
      )}
    </FormBase>
  );
};

export const FormSelect: TFormControlFunc<{ children: React.ReactNode }> = ({
  children,
  className,
  placeholder,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {({ onChange, onBlur, ...field }) => (
        <Select {...field} onValueChange={onChange} value={field.value ?? ""}>
          <SelectTrigger
            aria-invalid={field["aria-invalid"]}
            id={field.id}
            onBlur={onBlur}
            className={className}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormBase>
  );
};

export const FormCheckbox: TFormControlFunc = ({ className, ...props }) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox
          {...field}
          checked={value}
          onCheckedChange={onChange}
          className={className}
        />
      )}
    </FormBase>
  );
};

export const FormRadioGroup: TFormControlFunc<{
  children: React.ReactNode;
}> = ({ children, className, ...props }) => {
  return (
    <FormBase {...props}>
      {({ onChange, value, id, ...field }) => (
        <RadioGroup
          {...field}
          id={id}
          value={
            value === true ? "true" : value === false ? "false" : value ?? ""
          }
          onValueChange={(val) => {
            if (val === "true") onChange(true);
            else if (val === "false") onChange(false);
            else onChange(val);
          }}
          className={className}
        >
          {children}
        </RadioGroup>
      )}
    </FormBase>
  );
};

export const FormSwitch: TFormControlFunc = ({ className, ...props }) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ value, onChange, ...field }) => (
        <Switch
          {...field}
          checked={value}
          onCheckedChange={onChange}
          className={className}
        />
      )}
    </FormBase>
  );
};

export const FormSlider: TFormControlFunc<{
  min?: number;
  max?: number;
  step?: number;
}> = ({ min = 0, max = 100, step = 1, className, ...props }) => {
  return (
    <FormBase {...props}>
      {({ value, onChange, ...field }) => (
        <Slider
          {...field}
          value={[value ?? min]}
          min={min}
          max={max}
          step={step}
          onValueChange={(val: any) => onChange(val[0])}
          className={className}
        />
      )}
    </FormBase>
  );
};
