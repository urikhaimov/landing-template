"use client";

import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";
import type { ServiceItem } from "../lib/i18n";

export default function Services() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { ui } = context;

  return (
    <Box 
      id="services"
      sx={{ py: 10, px: 2, textAlign: "center" }}>
      {/* Section Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 6 }}>
        {ui.servicesTitle}
      </Typography>

      {/* Card Container */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {ui.services.map((service: ServiceItem, index: number) => (
          <motion.div
            key={service.title + index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Paper
              elevation={6}
              sx={{
                width: 300,
                p: 4,
                borderRadius: 3,
                textAlign: "center",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {service.title}
              </Typography>

              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                {service.description}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
