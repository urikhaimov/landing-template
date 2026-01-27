"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
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
          flexDirection: "column",
          gap: 4,
          px: 2,
          py: 8,
          direction: lang === "he" ? "rtl" : "ltr",
        }}
      >
        {/* HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <Image
            src="/hero.svg"
            alt={
              lang === "he"
                ? "איור מודרני לחלק העליון"
                : "Modern abstract hero illustration"
            }
            width={360}
            height={320}
            priority
            style={{ maxWidth: "90%", height: "auto" }}
          />
        </motion.div>

        {/* TEXT */}
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

          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            {ui.heroSubtitle}
          </Typography>

          {/* ACTION BUTTONS */}
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
