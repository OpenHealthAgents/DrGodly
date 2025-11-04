"use client";

import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "../schema/form-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface PreferencesStepProps {
  form: UseFormReturn<FormData>;
}

export function PreferencesStep({ form }: PreferencesStepProps) {
  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer font-medium">
                  Subscribe to newsletter
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Receive updates and news about our services
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
