import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowWeWork from "@/components/home/HowWeWork";
import Testimonials from "@/components/home/Testimonials";
import FaqAccordion from "@/components/home/FaqAccordion";
import CtaBanner from "@/components/home/CtaBanner";
import { getServices, getFaqs, getTestimonials } from "@/lib/db/queries";

export default async function HomePage() {
  const [services, faqs, testimonials] = await Promise.all([
    getServices(),
    getFaqs(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <ServicesGrid services={services} />
      <WhyChooseUs />
      <HowWeWork />
      <Testimonials items={testimonials} />
      <FaqAccordion faqs={faqs} />
      <CtaBanner />
    </>
  );
}
