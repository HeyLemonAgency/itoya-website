import type { Metadata } from "next";
import { Opening } from "@/components/hero/Opening";
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
      <Opening />
      <FoodSequence />
      <Formulas />
      <Room />
      <Visit />
    </>
  );
}
