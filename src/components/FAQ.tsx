"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";

export default function FAQ() {
  const { ui, lang } = useContext(AppContext)!;

  return (
    <section id="faq" aria-labelledby="faq-title">
      <Box sx={{ py: 10, px: 2 }}>
        <Typography
          id="faq-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}
        >
          {ui.faqTitle}
        </Typography>

        <Box
          sx={{
            maxWidth: 700,
            mx: "auto",
            direction: lang === "he" ? "rtl" : "ltr",
          }}
        >
          {ui.faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
            >
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-header-${index}`}
                >
                  <Typography sx={{ fontWeight: "600" }}>
                    {item.q}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography sx={{ opacity: 0.9 }}>{item.a}</Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Box>
    </section>
  );
}
