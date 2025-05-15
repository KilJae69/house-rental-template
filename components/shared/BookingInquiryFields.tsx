// components/BookingInquiryFields.tsx
"use client";

import { useForm, useWatch } from "react-hook-form";
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
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { format, parseISO, startOfDay } from "date-fns"; // ← parseISO for safe parsing
import { enUS } from "date-fns/locale/en-US"; // ← english locale
import { bs } from "date-fns/locale/bs"; // ← bosnian locale
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

type Props = {
  onSuccess?: () => void;
};

export default function BookingInquiryFields({ onSuccess }: Props) {
  const [openIn, setOpenIn] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  const t = useTranslations("BookingInquiryForm");
  const locale = useLocale(); // ← get current locale code
  const dateFnsLocale = locale === "bs" ? bs : enUS; // ← pick the right date-fns locale

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

  // watch both dates
  const watchIn = useWatch({ control: form.control, name: "checkIn" });
  const watchOut = useWatch({ control: form.control, name: "checkOut" });

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
    toast.success(t("successMessage"));
    onSuccess?.();
  }

  // always block anything before today
  const today = startOfDay(new Date());

  // returns a fn that disables dates based on whether
  // this calendar is the start-picker (isStart=true) or end-picker
  function makeDisabledFn(isStart: boolean) {
    return (date: Date) => {
      // 1) no past dates
      if (date < today) return true;

      // 2) if only checkIn is set, in the END-calendar we prevent picking before it
      if (watchIn && !watchOut && !isStart) {
        return date < parseISO(watchIn);
      }

      // 3) if only checkOut is set, in the START-calendar we prevent picking after it
      if (watchOut && !watchIn && isStart) {
        return date > parseISO(watchOut);
      }

      // 4) if both are set, always block outside that window
      if (watchIn && watchOut) {
        const start = parseISO(watchIn);
        const end = parseISO(watchOut);
        return date < start || date > end;
      }

      return false;
    };
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Check-in */}
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("fields.checkIn.label")}</FormLabel>

                {/* CONTROLLED ROOT */}
                <Popover open={openIn} onOpenChange={setOpenIn}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="w-full relative">
                        <Input
                          readOnly
                          placeholder={t("fields.checkIn.placeholder")}
                          value={
                            field.value
                              ? format(parseISO(field.value), "PP", {
                                  locale: dateFnsLocale,
                                })
                              : ""
                          }
                          aria-invalid={!!fieldState.error}
                          className="cursor-pointer pr-10"
                        />
                        {field.value && (
                          <button
                            type="button"
                            aria-label="Clear date"
                            className="absolute cursor-pointer right-12 top-1/2 -translate-y-1/2 text-sm  hover:opacity-80 focus:outline-none"
                            onClick={() => {
                              field.onChange(""); // clear the value
                              setOpenIn(false); // close the popover
                            }}
                          >
                            <FaXmark className="size-7 text-[var(--color-primary-dark)]"/>
                          </button>
                        )}
                         <CalendarIcon
                          className={`absolute  right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                            fieldState.error
                              ? "text-rose-600"
                              : "text-[var(--color-primary-dark)]"
                          }`}
                        />
                      </div>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent align="start" className="p-0 w-auto bg-white">
                    <Calendar
                      mode="single"
                      selected={field.value ? parseISO(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          const iso = format(date, "yyyy-MM-dd");
                          field.onChange(iso);
                        }
                        setOpenIn(false);
                      }}
                      disabled={makeDisabledFn(true)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Check-out */}
          <FormField
            control={form.control}
            name="checkOut"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t("fields.checkOut.label")}</FormLabel>
                <Popover open={openOut} onOpenChange={setOpenOut}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          readOnly
                          aria-invalid={!!fieldState.error}
                          placeholder={t("fields.checkOut.placeholder")}
                          value={
                            field.value
                              ? format(parseISO(field.value), "PP", {
                                  locale: dateFnsLocale,
                                })
                              : ""
                          }
                          className="cursor-pointer pr-10"
                        />
                        {field.value && (
                          <button
                            type="button"
                            aria-label="Clear date"
                            className="absolute cursor-pointer right-12 top-1/2 -translate-y-1/2 text-sm  hover:opacity-80 focus:outline-none"
                            onClick={() => {
                              field.onChange(""); // clear the value
                              setOpenIn(false); // close the popover
                            }}
                          >
                            <FaXmark className="size-7 text-[var(--color-primary-dark)]"/>
                          </button>
                        )}
                        <CalendarIcon
                          className={`absolute  right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                            fieldState.error
                              ? "text-rose-600"
                              : "text-[var(--color-primary-dark)]"
                          }`}
                        />
                      </div>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-fit p-0 bg-white z-50 "
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value ? parseISO(field.value) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          const iso = format(date, "yyyy-MM-dd");
                          field.onChange(iso);
                        }
                        setOpenOut(false);
                      }}
                      disabled={makeDisabledFn(false)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* reserve 1rem of height so error pops in without shift */}
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
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer min-h-[4rem] text-white"
        >
          {isSubmitting ? t("button.submitting") : t("button.submit")}
        </Button>
      </form>
    </Form>
  );
}
