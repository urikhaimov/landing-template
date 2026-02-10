"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useRef, useEffect } from "react";
import AppContext from "../lib/AppContext";

export default function FAQ() {
  const { ui, lang } = useContext(AppContext)!;

  const [expanded, setExpanded] = useState<number | false>(false);

  // store refs for auto-scroll
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // auto-scroll the opened item into view
  useEffect(() => {
    if (expanded === false) return;
    const el = itemRefs.current[expanded];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [expanded]);

  const handleChange =
    (index: number) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
    };

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
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
            >
              {/* FAQ BOX */}
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: "0px 3px 12px rgba(0,0,0,0.06)",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-header-${index}`}
                >
                  <Typography sx={{ fontWeight: 600 }}>{item.q}</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  <AnimatePresence initial={false}>
                    {expanded === index && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          transition: { duration: 0.35 },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: { duration: 0.25 },
                        }}
                        style={{
                          overflow: "hidden",
                          padding: "0 16px 16px 16px",
                        }}
                      >
                        <Typography sx={{ opacity: 0.9 }}>{item.a}</Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AccordionDetails>
              </Accordion>

              {/* 🔥 DIVIDER BETWEEN FAQ BOXES */}
              <AnimatePresence>
                {expanded === index && index < ui.faq.length - 1 && (
                  <motion.div
                    key={`divider-${index}`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 0.2, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      height: "1px",
                      backgroundColor: "rgba(0,0,0,0.2)",
                      margin: "12px 0 16px",
                      transformOrigin:
                        lang === "he" ? "right" : "left",
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </Box>
      </Box>
    </section>
  );
}
