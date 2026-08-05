import "dotenv/config";
import { db } from "./index";
import { services, doctors, faqs, testimonials, siteSettings } from "./schema";
import bcrypt from "bcryptjs";
import { adminUsers } from "./schema";

async function main() {
  console.log("Seeding database...");

  // ---------- Services ----------
  const serviceData = [
    {
      title: "Dental Examination",
      slug: "dental-examination",
      shortDesc:
        "Comprehensive oral check-ups to detect and prevent dental issues early for optimal oral health.",
      longDesc:
        "Our thorough dental examinations cover teeth, gums, and jaw to catch problems before they become serious, using in-house diagnostic tools for accurate assessments.",
      order: 1,
    },
    {
      title: "Root Canal Treatment",
      slug: "root-canal-treatment",
      shortDesc:
        "Painless root canal therapy to remove infection and restore damaged teeth effectively.",
      longDesc:
        "Using modern rotary endodontic techniques, our root canal treatments are virtually painless and often completed in a single sitting.",
      order: 2,
    },
    {
      title: "Dental Cleaning and Polishing",
      slug: "dental-cleaning-polishing",
      shortDesc:
        "Professional teeth cleaning and polishing for a brighter smile and healthier gums.",
      longDesc:
        "Regular scaling and polishing removes plaque and tartar buildup, keeping your gums healthy and your smile bright.",
      order: 3,
    },
    {
      title: "Cosmetic Dentistry",
      slug: "cosmetic-dentistry",
      shortDesc:
        "Enhance your smile with teeth whitening, veneers, and aesthetic dental procedures.",
      longDesc:
        "From teeth whitening to veneers, our cosmetic treatments are tailored to give you the confident smile you want.",
      order: 4,
    },
    {
      title: "Periodontal Treatment",
      slug: "periodontal-treatment",
      shortDesc:
        "Specialized care for gum diseases, ensuring healthy gums and preventing tooth loss.",
      longDesc:
        "Our periodontal care includes deep cleaning, laser therapy, and flap surgery to treat gum disease at every stage.",
      order: 5,
    },
    {
      title: "Pediatric Dentistry",
      slug: "pediatric-dentistry",
      shortDesc:
        "Gentle dental care tailored for children, ensuring healthy teeth from an early age.",
      longDesc:
        "A child-friendly approach to preventive and restorative dentistry, helping kids build healthy habits early.",
      order: 6,
    },
    {
      title: "X-Rays and Diagnostic Imaging",
      slug: "xray-diagnostic-imaging",
      shortDesc:
        "Advanced digital X-rays and imaging for precise diagnosis and effective treatment planning.",
      longDesc:
        "In-house digital X-ray equipment means faster, more accurate diagnosis without needing an outside referral.",
      order: 7,
    },
    {
      title: "Fillings and Restorations",
      slug: "fillings-restorations",
      shortDesc:
        "High-quality fillings and restorations to repair cavities and restore tooth function.",
      longDesc:
        "Tooth-colored fillings and restorations that blend naturally while restoring full function.",
      order: 8,
    },
    {
      title: "Extractions",
      slug: "extractions",
      shortDesc:
        "Safe and painless tooth extractions for damaged, decayed, or impacted teeth.",
      longDesc:
        "When a tooth can't be saved, our gentle extraction techniques minimize discomfort and speed up healing.",
      order: 9,
    },
    {
      title: "Orthodontic Treatment",
      slug: "orthodontic-treatment",
      shortDesc:
        "Braces and aligners to straighten teeth and correct bite alignment for a perfect smile.",
      longDesc:
        "From traditional braces to clear aligner therapy, we help patients of all ages achieve a straighter smile.",
      order: 10,
    },
    {
      title: "Dental Implants",
      slug: "dental-implants",
      shortDesc:
        "Permanent solutions for missing teeth using advanced implant technology for a natural feel.",
      longDesc:
        "Durable, natural-feeling implants that restore both function and aesthetics for missing teeth.",
      order: 11,
    },
    {
      title: "Oral Surgery",
      slug: "oral-surgery",
      shortDesc:
        "Expert surgical procedures for wisdom teeth removal, jaw corrections, and more.",
      longDesc:
        "Our oral surgery services cover wisdom tooth extractions, jaw corrections, and other surgical needs with precision care.",
      order: 12,
    },
    {
      title: "Orofacial Pain Management",
      slug: "orofacial",
      shortDesc:
        "Effective care for chronic facial pain, tension, and jaw muscle strain.",
      longDesc:
        "Personalized treatment plans to manage chronic facial pain and muscle tension for lasting relief.",
      order: 13,
    },
    {
      title: "TMJ Pain Management",
      slug: "tmj",
      shortDesc:
        "Personalized treatments for jaw pain, clicking, and related joint discomfort.",
      longDesc:
        "Targeted therapy for temporomandibular joint issues, addressing pain, clicking, and jaw mobility problems.",
      order: 14,
    },
  ];
  await db.insert(services).values(serviceData).onConflictDoNothing();

  // ---------- Doctors ----------
  const doctorData = [
    {
      name: "Dr. R. Sandeep",
      slug: "dr-r-sandeep",
      title: "Oral Medicine Specialist",
      qualification: "MDS - Oral Medicine and Radiology",
      bio: "Dr. R Sandeep is a highly accomplished oral medicine specialist who earned his MDS in Oral Medicine and Radiology from GITAM Dental College, Visakhapatnam, and has treated a number of rare and complex cases.",
      order: 1,
    },
    {
      name: "Dr. P Krupavathi",
      slug: "dr-p-krupavathi",
      title: "Oral Medicine Specialist",
      qualification: "MDS - Oral Medicine and Radiology",
      bio: "Dr. P Krupavathi specializes in Single Sitting Root Canal Treatments, with additional training in Simplified Rotary Endodontics.",
      order: 2,
    },
    {
      name: "Dr. G Ravi Teja",
      slug: "dr-g-ravi-teja",
      title: "Orthodontic Specialist",
      qualification: "MDS - Orthodontics",
      bio: "Dr. G Ravi Teja specializes in creating beautiful, healthy smiles with advanced orthodontic techniques, particularly clear aligner therapy.",
      order: 3,
    },
    {
      name: "Dr. Abhinash Patra",
      slug: "dr-abhinash-patra",
      title: "Periodontal and Implant Specialist",
      qualification: "MDS - Periodontology",
      bio: "Dr. Abhinash Patra specializes in diagnosis, treatment, and prevention of periodontal disease using laser therapy and flap surgery, as well as dental implant placement.",
      order: 4,
    },
    {
      name: "Dr. K Naga Sai Reddy",
      slug: "dr-k-naga-sai-reddy",
      title: "Oral and Maxillofacial Surgeon",
      qualification: "MDS - Oral and Maxillofacial Surgery",
      bio: "Dr. Naga Sai Reddy specializes in complex surgical procedures including implant placements and surgical extractions of impacted teeth.",
      order: 5,
    },
    {
      name: "Dr. M Venkateswara Reddy",
      slug: "dr-m-venkateswara-reddy",
      title: "General Dentist & Hospital Administrator",
      qualification: "MDS - Public Health Dentistry, MBA Hospital Administration",
      bio: "Dr. M Venkateswara Reddy provides comprehensive general dentistry services and brings hospital administration expertise to the practice.",
      order: 6,
    },
    {
      name: "Dr. J Nikitha",
      slug: "dr-j-nikitha",
      title: "Paedodontist",
      qualification: "MDS - Paediatric and Preventive Dentistry",
      bio: "Dr. J Nikitha provides comprehensive, child-friendly dental care for infants, children, and adolescents.",
      order: 7,
    },
  ];
  await db.insert(doctors).values(doctorData).onConflictDoNothing();

  // ---------- FAQs ----------
  const faqData = [
    {
      question: "What should I bring to my first dental appointment?",
      answer:
        "Please bring a valid ID, your dental insurance card (if applicable), a list of any medications you're taking, and relevant dental records (if available).",
      order: 1,
    },
    {
      question: "How do I schedule a dental appointment?",
      answer:
        "You can easily schedule an appointment by calling us directly or using our online booking system through our website.",
      order: 2,
    },
    {
      question: "What dental services do you offer?",
      answer:
        "We offer a wide range of dental services, including routine checkups, cleanings, fillings, crowns, orthodontics, teeth whitening, and cosmetic dentistry.",
      order: 3,
    },
    {
      question: "How do I know if I need a filling or a crown?",
      answer:
        "If you have a cavity or extensive tooth decay, we may recommend a filling. If the tooth is severely damaged or weak, a crown may be needed.",
      order: 4,
    },
    {
      question: "What should I expect during a dental cleaning?",
      answer:
        "Our hygienist will remove plaque and tartar buildup, polish your teeth to remove stains, and check for signs of gum disease or other issues.",
      order: 5,
    },
    {
      question: "Do you offer sedation dentistry?",
      answer:
        "Yes, we offer sedation options including local anesthesia, nitrous oxide (laughing gas), and oral sedation for more complex procedures.",
      order: 6,
    },
  ];
  await db.insert(faqs).values(faqData).onConflictDoNothing();

  // ---------- Testimonials ----------
  const testimonialData = [
    {
      name: "Rajesh Kumar",
      treatment: "Root Canal Treatment",
      message:
        "Dr. Sandeep is truly the best! He explained my treatment thoroughly and made sure I was comfortable throughout. Highly recommended!",
      order: 1,
    },
    {
      name: "Sneha Reddy",
      treatment: "Dental Implants",
      message:
        "My dental implant procedure was smooth and painless. The care and expertise at Sri Vasavi Dental Hospital are unmatched.",
      order: 2,
    },
    {
      name: "Vikram Choudhary",
      treatment: "Braces & Orthodontics",
      message:
        "Dr. Sandeep and his team provided excellent orthodontic care. My smile has completely transformed, and I couldn't be happier!",
      order: 3,
    },
    {
      name: "Pooja Mehta",
      treatment: "Teeth Whitening",
      message:
        "The best dental care I have ever received! Dr. Sandeep and his staff are caring, professional, and highly skilled.",
      order: 4,
    },
  ];
  await db.insert(testimonials).values(testimonialData).onConflictDoNothing();

  // ---------- Site settings ----------
  await db
    .insert(siteSettings)
    .values({
      clinicName: "Sri Vasavi Multispeciality Dental Hospital",
      phone: "+91 83285 93906",
      whatsapp: "+91 83285 93906",
      email: "srivasavimultispecialitydental@gmail.com",
      address: "Lambadi Donka, Above Siri Chandana Scan Centre, Ongole",
      hoursWeekday: "Mon to Sun 09:00 AM - 08:30 PM",
      hoursSunday: "Sunday 09:00 AM - 01:00 PM",
      instagramUrl: "https://www.instagram.com/sri_vasavi_dental_2024/",
    })
    .onConflictDoNothing();

  // ---------- Default admin user ----------
  const passwordHash = await bcrypt.hash("admin123", 10);
  await db
    .insert(adminUsers)
    .values({
      email: "admin@srivasavidental.in",
      passwordHash,
      name: "Clinic Admin",
    })
    .onConflictDoNothing();

  console.log("Seed complete.");
  console.log("Default admin login -> admin@srivasavidental.in / admin123 (change this before launch!)");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
