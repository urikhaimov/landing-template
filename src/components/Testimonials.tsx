"use client";

import { Box, Paper, Typography } from "@mui/material";
import Slider from "react-slick";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";
import { motion } from "framer-motion";
import type { ReviewItem } from "../lib/i18n";

export default function Testimonials() {
  const context = useContext(AppContext);
  if (!context) return null;

  const { ui, lang } = context;

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: true,
    rtl: lang === "he",
  };

  return (
    <Box sx={{ py: 10, px: 2 }}>
      {/* Section Title */}
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}
      >
        {ui.reviewsTitle}
      </Typography>

      <Box 
        sx={{ 
          maxWidth: 600, 
          mx: "auto",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Slider {...settings}>
            {ui.reviews.map((review: ReviewItem, index: number) => (
              <Box key={`${review.name}-${index}`} sx={{ px: 2 }}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    textAlign: "center",
                    minHeight: 180,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {review.name}
                  </Typography>

                  {/* 
                    FIXED:
                    Instead of "{review.comment}"
                    we use &ldquo; &rdquo; 
                  */}
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    &ldquo;{review.comment}&rdquo;
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Slider>
        </motion.div>
      </Box>
    </Box>
  );
}
