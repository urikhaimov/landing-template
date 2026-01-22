"use client";

import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../lib/AppContext";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { ui, lang } = useContext(AppContext);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

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
    } catch (err) {
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <Box  id="contact" sx={{ py: 10, px: 2 }}>
      <Typography
        variant="h4"
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
        <TextField
          label={lang === "he" ? "שם" : "Name"}
          {...register("name", { required: true })}
          required
        />

        <TextField
          type="email"
          label={lang === "he" ? "אימייל" : "Email"}
          {...register("email", { required: true })}
          required
        />

        <TextField
          label={ui.contactPlaceholder}
          {...register("message", { required: true })}
          multiline
          rows={4}
          required
        />

        {status === "success" && (
          <Alert severity="success">
            {lang === "he" ? "ההודעה נשלחה!" : "Message sent!"}
          </Alert>
        )}

        {status === "error" && (
          <Alert severity="error">
            {lang === "he" ? "שגיאה בשליחה" : "Error sending message"}
          </Alert>
        )}

        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading
            ? lang === "he"
              ? "שולח..."
              : "Sending..."
            : ui.contactSend}
        </Button>
      </Box>
    </Box>
  );
}
