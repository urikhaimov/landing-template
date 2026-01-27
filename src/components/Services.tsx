"use client";

import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";

export default function Services() {
  const { ui, lang } = useContext(AppContext)!;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      style={{ paddingTop: "80px" }}
    >
      <Box sx={{ py: 10, px: 2, textAlign: "center" }}>
        <Typography
          id="services-title"
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold", mb: 6 }}
        >
          {ui.servicesTitle}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            direction: lang === "he" ? "rtl" : "ltr",
          }}
        >
          {ui.services.map((service, index) => (
            <motion.article
              key={index}
              role="article"
              aria-label={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.45 }}
            >
              <Paper
                elevation={6}
                sx={{
                  width: 300,
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  cursor: "default",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {service.title}
                </Typography>

                <Typography variant="body1" sx={{ opacity: 0.85 }}>
                  {service.description}
                </Typography>
              </Paper>
            </motion.article>
          ))}
        </Box>
      </Box>
    </section>
  );
}
