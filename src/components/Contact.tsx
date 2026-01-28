"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { AppContext } from "../lib/AppContext";
import { motion } from "framer-motion";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { ui, lang } = useContext(AppContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  // Shake animation
  const shake = {
    animate: (err: boolean) =>
      err
        ? {
            x: [-6, 6, -6, 6, 0],
            transition: { duration: 0.3 },
          }
        : {},
  };

  // Static layout CSS (NOT in <motion.div style>)
  const fieldWrapper = {
    width: "100%",
    maxWidth: "500px",
    position: "relative",
    margin: "0 auto",
  };

  const helperStyle = {
    position: "absolute",
    bottom: "-22px",
    fontSize: "0.75rem",
    color: "error.main",
    ...(lang === "he"
      ? { right: 0, textAlign: "right" }
      : { left: 0, textAlign: "left" }),
  };

  // Submit handler
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        reset();
      } else {
        throw new Error(result.error);
      }
    } catch {
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <section id="contact" aria-labelledby="contact-title">
      <Box sx={{ py: 10, px: 2 }}>
        <Typography
          id="contact-title"
          variant="h4"
          component="h2"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 6 }}
        >
          {ui.contactTitle}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            maxWidth: 500,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            direction: lang === "he" ? "rtl" : "ltr",
          }}
        >
          {/* NAME */}
          <motion.div animate={shake.animate(!!errors.name)}>
            <Box sx={fieldWrapper}>
              <TextField
                fullWidth
                label={lang === "he" ? "שם *" : "Name *"}
                {...register("name", {
                  required: lang === "he" ? "נא למלא את השם" : "Name is required",
                  minLength: {
                    value: 2,
                    message: lang === "he" ? "השם קצר מדי" : "Name is too short",
                  },
                })}
                error={!!errors.name}
                onBlur={() => trigger("name")}
              />
              {errors.name && (
                <FormHelperText sx={helperStyle}>
                  {errors.name.message}
                </FormHelperText>
              )}
            </Box>
          </motion.div>

          {/* EMAIL */}
          <motion.div animate={shake.animate(!!errors.email)}>
            <Box sx={fieldWrapper}>
              <TextField
                fullWidth
                type="email"
                label={lang === "he" ? "אימייל *" : "Email *"}
                {...register("email", {
                  required: lang === "he" ? "נא למלא אימייל" : "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message:
                      lang === "he" ? "האימייל אינו תקין" : "Invalid email",
                  },
                })}
                error={!!errors.email}
                onBlur={() => trigger("email")}
              />
              {errors.email && (
                <FormHelperText sx={helperStyle}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </Box>
          </motion.div>

          {/* MESSAGE */}
          <motion.div animate={shake.animate(!!errors.message)}>
            <Box sx={fieldWrapper}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={lang === "he" ? "הודעה *" : "Message *"}
                {...register("message", {
                  required:
                    lang === "he" ? "נא לכתוב הודעה" : "Message is required",
                  minLength: {
                    value: 5,
                    message:
                      lang === "he" ? "ההודעה קצרה מדי" : "Message is too short",
                  },
                })}
                error={!!errors.message}
                onBlur={() => trigger("message")}
              />
              {errors.message && (
                <FormHelperText sx={helperStyle}>
                  {errors.message.message}
                </FormHelperText>
              )}
            </Box>
          </motion.div>

          {/* NOTIFICATIONS */}
          {status === "success" && (
            <Alert severity="success">{lang === "he" ? "ההודעה נשלחה!" : "Message sent!"}</Alert>
          )}

          {status === "error" && (
            <Alert severity="error">{lang === "he" ? "שגיאה בשליחה" : "Error sending message"}</Alert>
          )}

          {/* SUBMIT */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ height: 50 }}
          >
            {loading
              ? lang === "he"
                ? "שולח..."
                : "Sending..."
              : ui.contactSend}
          </Button>
        </Box>
      </Box>
    </section>
  );
}
