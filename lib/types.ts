import { z } from "zod";

// 1) Wrap your schema in a function that takes t()
export const formSchema = (t: (key: string) => string) =>
  z
    .object({
      checkIn: z
        .string()
        .min(1, { message: t("validation.required") }),
      checkOut: z
        .string()
        .min(1, { message: t("validation.required") }),
      name: z
        .string()
        .min(1, { message: t("validation.required") })
        .max(100, { message: t("validation.nameMax") }),
      email: z
        .string()
        .min(1, { message: t("validation.required") })
        .email({ message: t("validation.emailInvalid") }),
      message: z
        .string()
        .max(500, { message: t("validation.messageMax") })
        .optional(),
    })
    .refine(
      (data) => new Date(data.checkIn) < new Date(data.checkOut),
      {
        message: t("validation.checkOutAfter"),
        path: ["checkOut"],
      }
    );

// 2) Export a type from the ReturnType of that function
export type FormValues = z.infer<ReturnType<typeof formSchema>>;
