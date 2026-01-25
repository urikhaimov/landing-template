

import { Box } from "@mui/material";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import NavbarClientWrapper from "@/components/NavbarClientWrapper";

export default function Page() {
  return (
    <>

      <Box sx={{ overflowX: "hidden", pt: 10 }}>
         <NavbarClientWrapper />
        <Hero />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </Box>
    </>
  );
}
