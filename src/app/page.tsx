import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Intro } from "@/components/home/Intro";
import { FoodSequence } from "@/components/home/FoodSequence";
import { Formulas } from "@/components/home/Formulas";
import { Room } from "@/components/home/Room";
import { Visit } from "@/components/home/Visit";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FoodSequence />
      <Formulas />
      <Room />
      <Visit />
    </>
  );
}
