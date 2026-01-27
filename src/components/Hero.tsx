"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";

export default function Hero() {
  const { ui, toggleLang, toggleMode, mode, lang } = useContext(AppContext)!;

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      style={{ position: "relative" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
       
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: 2,
          direction: lang === "he" ? "rtl" : "ltr",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            id="hero-title"
            variant="h2"
            component="h1"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            {ui.heroTitle}
          </Typography>

          <Typography variant="h5" sx={{ mb: 4 }}>
            {ui.heroSubtitle}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              aria-label={ui.callToAction}
              href="#contact"
            >
              {ui.callToAction}
            </Button>

            <Button
              variant="outlined"
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              {ui.toggleLang}
            </Button>

            <Button
              variant="outlined"
              onClick={toggleMode}
              aria-label="Toggle theme"
            >
              {ui.getToggleThemeLabel(mode)}
            </Button>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
}
