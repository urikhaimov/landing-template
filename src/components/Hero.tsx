"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";

export default function Hero() {
const { ui, toggleLang, toggleMode, mode } = useContext(AppContext);

  return (
    <Box
      sx={{
        position: "relative",
       
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: (theme) => theme.palette.text.primary,
        backgroundSize: "cover",
        backgroundPosition: "center",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {ui.heroTitle}
        </Typography>

        <Typography variant="h5" sx={{ mb: 4 }}>
          {ui.heroSubtitle}
        </Typography>

       
      </motion.div>
    </Box>
  );
}
