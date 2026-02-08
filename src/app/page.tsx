"use client";

import { Box } from "@mui/material";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Box sx={{ overflowX: "hidden", pt: 10, bgcolor: "background.default" }}>
        <Hero />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </Box>
    </main>
  );
}
