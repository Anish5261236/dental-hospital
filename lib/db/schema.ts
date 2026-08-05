import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

// ---------- Services (e.g. Root Canal, Cleaning, Implants...) ----------
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  shortDesc: text("short_desc").notNull(),
  longDesc: text("long_desc"),
  icon: varchar("icon", { length: 255 }),
  image: varchar("image", { length: 255 }),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------- Doctors ----------
export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  title: varchar("title", { length: 160 }), // e.g. "Orthodontic Specialist"
  qualification: varchar("qualification", { length: 160 }), // e.g. "MDS - Orthodontics"
  bio: text("bio"),
  photo: varchar("photo", { length: 255 }),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---------- Gallery ----------
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 255 }).notNull(),
  caption: varchar("caption", { length: 200 }),
  category: varchar("category", { length: 100 }),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- Testimonials ----------
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  treatment: varchar("treatment", { length: 150 }),
  message: text("message").notNull(),
  photo: varchar("photo", { length: 255 }),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- FAQs ----------
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: text("answer").notNull(),
  order: integer("order").default(0).notNull(),
});

// ---------- Appointments (booking form submissions) ----------
export const appointmentStatusValues = [
  "new",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 160 }),
  serviceId: integer("service_id").references(() => services.id),
  preferredDate: varchar("preferred_date", { length: 40 }),
  message: text("message"),
  status: varchar("status", { length: 20 }).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- Contact messages ----------
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }),
  phone: varchar("phone", { length: 20 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- Admin users ----------
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 120 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---------- Site settings (singleton row) ----------
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  clinicName: varchar("clinic_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  whatsapp: varchar("whatsapp", { length: 20 }),
  email: varchar("email", { length: 160 }),
  address: text("address"),
  hoursWeekday: varchar("hours_weekday", { length: 100 }),
  hoursSunday: varchar("hours_sunday", { length: 100 }),
  instagramUrl: varchar("instagram_url", { length: 255 }),
});
