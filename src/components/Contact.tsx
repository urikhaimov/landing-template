"use client";

import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../lib/AppContext";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FieldName = keyof FormValues;

export default function Contact() {
  const { ui, lang } = useContext(AppContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: "onSubmit" });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  // Refs for scrolling to the first invalid field
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLInputElement | null>(null);

  const fieldRefs: Record<FieldName, React.RefObject<HTMLInputElement | null>> = {
    name: nameRef,
    email: emailRef,
    message: messageRef,
  };

  // Auto-scroll to first validation error
  useEffect(() => {
    const firstError = Object.keys(errors)[0] as FieldName | undefined;

    if (!firstError) return;

    const ref = fieldRefs[firstError];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  }, [errors, fieldRefs]);

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
            gap: 3,
            direction: lang === "he" ? "rtl" : "ltr",
          }}
        >
          {/* NAME */}
          <TextField
            inputRef={nameRef}
            label={lang === "he" ? "שם" : "Name"}
            {...register("name", {
              required: lang === "he" ? "אנא הזן שם" : "Name is required",
              minLength: {
                value: 2,
                message:
                  lang === "he" ? "השם קצר מדי" : "Name is too short",
              },
            })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          {/* EMAIL */}
          <TextField
            inputRef={emailRef}
            type="email"
            label={lang === "he" ? "אימייל" : "Email"}
            {...register("email", {
              required: lang === "he" ? "אנא הזן אימייל" : "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message:
                  lang === "he" ? "אימייל לא תקין" : "Invalid email address",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          {/* MESSAGE */}
          <TextField
            inputRef={messageRef}
            label={lang === "he" ? "הודעה" : "Message"}
            multiline
            rows={4}
            {...register("message", {
              required: lang === "he" ? "אנא הזן הודעה" : "Message is required",
              minLength: {
                value: 5,
                message:
                  lang === "he"
                    ? "ההודעה קצרה מדי"
                    : "Message is too short",
              },
            })}
            error={Boolean(errors.message)}
            helperText={errors.message?.message}
          />

          {/* STATUS MESSAGES */}
          {status === "success" && (
            <Alert severity="success" aria-live="polite">
              {lang === "he" ? "ההודעה נשלחה!" : "Message sent!"}
            </Alert>
          )}

          {status === "error" && (
            <Alert severity="error" aria-live="assertive">
              {lang === "he" ? "שגיאה בשליחה" : "Error sending message"}
            </Alert>
          )}

          {/* SUBMIT */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            aria-label={ui.contactSend}
            sx={{ height: 48, fontSize: "1rem" }}
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
