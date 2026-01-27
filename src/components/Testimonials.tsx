"use client";

import { Box, Paper, Typography } from "@mui/material";
import Slider from "react-slick";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";
import { motion } from "framer-motion";

export default function Testimonials() {
  const { ui, lang } = useContext(AppContext)!;

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
              {ui.reviews.map((review, index) => (
                <Box
                  key={index}
                  sx={{ px: 2 }}
                  role="group"
                  aria-label={`${review.name} - testimonial`}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      textAlign: "center",
                      minHeight: 180,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {review.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.8 }}
                      aria-label="testimonial text"
                    >
                      &ldquo;{review.comment}&rdquo;
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Slider>
          </motion.div>
        </Box>
      </Box>
    </section>
  );
}
