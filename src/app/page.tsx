import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <Box sx={{ overflowX: "hidden", pt: 10 }}>
        <Hero />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </Box>
    </>
  );
}
