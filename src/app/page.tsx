"use client";



import { Box } from "@mui/material";

// Import all components
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function Page() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Hero />
      <Services />
      <Testimonials />
      <FAQ />
      <Contact />

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          opacity: 0.8,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          mt: 6,
        }}
      >
        © {new Date().getFullYear()} Landing Template — All Rights Reserved
      </Box>
    </Box>
  );
}
