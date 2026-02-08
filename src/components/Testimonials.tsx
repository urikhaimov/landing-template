"use client";

import { Box, Paper, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import AppContext from "../lib/AppContext";

export default function Testimonials() {
  const { ui, lang } = useContext(AppContext)!;

  const [index, setIndex] = useState(0);

  const isRTL = lang === "he";

  // Auto-play every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ui.reviews.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [ui.reviews.length]);

  const next = () => {
    setIndex((prev) => (prev + 1) % ui.reviews.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? ui.reviews.length - 1 : prev - 1
    );
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      role="region"
      aria-roledescription="carousel"
    >
      <Box sx={{ py: 10, px: 2 }}>
        <Typography
          id="testimonials-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}
        >
          {ui.reviewsTitle}
        </Typography>

        <Box
          sx={{
            maxWidth: 650,
            mx: "auto",
            position: "relative",
            overflow: "hidden",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? -60 : 60 }}
              transition={{ duration: 0.45 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: "center",
                  minHeight: 180,
                  border: "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "background.paper",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {ui.reviews[index].name}
                </Typography>

                <Typography variant="body1" sx={{ opacity: 0.85 }}>
                  &ldquo;{ui.reviews[index].comment}&rdquo;
                </Typography>
              </Paper>
            </motion.div>
          </AnimatePresence>

          {/* NAV BUTTONS */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              transform: "translateY(-50%)",
            }}
          >
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            >
              {isRTL ? "›" : "‹"}
            </button>

            <button
              onClick={next}
              aria-label="Next testimonial"
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
            >
              {isRTL ? "‹" : "›"}
            </button>
          </Box>
        </Box>
      </Box>
    </section>
  );
}
