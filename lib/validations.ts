import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .max(20),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(160)
    .optional()
    .or(z.literal("")),
  serviceId: z.string().optional(),
  preferredDate: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(160)
    .optional()
    .or(z.literal("")),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Please enter a message").max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;
