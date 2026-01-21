"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";

export default function Hero() {
  const { ui, toggleLang, toggleMode } = useContext(AppContext);

  return (
    <Box
      sx={{
        position: "relative",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
      
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

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button variant="contained" color="primary" size="large">
            {ui.callToAction}
          </Button>

          <Button variant="outlined" color="secondary" onClick={toggleLang}>
            {ui.toggleLang}
          </Button>

          <Button variant="outlined" onClick={toggleMode}>
            {ui.toggleTheme}
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
