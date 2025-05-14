// components/BookingInquiryFields.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

type Props = {
  onSuccess?: () => void;
};

export default function BookingInquiryFields({ onSuccess }: Props) {
      const t = useTranslations("BookingInquiryForm")
      
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      name: "",
      email: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: FormValues) {
    // ❗ your actual API call here
    await new Promise((r) => setTimeout(r, 1000));
    console.log(data);
    reset();
     toast.success(t("successMessage"))
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Check-in */}
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>{t("fields.checkIn.label")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled={isSubmitting} />
                </FormControl>
                {/* reserve 1rem for the message */}
                <div className="min-h-[1rem]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Check-out */}
          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>{t("fields.checkOut.label")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled={isSubmitting} />
                </FormControl>
                <div className="min-h-[1rem]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>{t("fields.name.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("fields.name.placeholder")}
                    {...field}
                    disabled={isSubmitting}
                    maxLength={100}
                  />
                </FormControl>
                <div className="min-h-[1rem]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>{t("fields.email.label")}</FormLabel>
                <FormControl>
                  <Input
                  className="border-[var(--color-primary-dark)]"
                    type="email"
                    placeholder={t("fields.email.placeholder")}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <div className="min-h-[1rem]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>{t("fields.message.label")}</FormLabel>
              <FormControl>
                <Textarea
                className="min-h-[170px]"
                  placeholder={t("fields.message.placeholder")}
                  {...field}
                  disabled={isSubmitting}
                  maxLength={500}
                  rows={6}
                />
              </FormControl>
              <div className="min-h-[1rem]">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer min-h-[4rem] text-white">
          {isSubmitting ? t("button.submitting") : t("button.submit")}
        </Button>
      </form>
    </Form>
  );
}
