"use client";

import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
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

  const rtl = lang === "he";

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
    <Box id="contact" sx={{ py: 10, px: 2 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 6,
        }}
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
          direction: rtl ? "rtl" : "ltr",
        }}
      >
        {/* NAME FIELD */}
        <TextField
          label={rtl ? "שם" : "Name"}
          {...register("name", { required: true })}
          required
          InputLabelProps={{
            sx: {
              right: rtl ? 18 : "auto",
              left: rtl ? "auto" : 14,
              transformOrigin: rtl ? "top right" : "top left",
            },
          }}
          inputProps={{
            style: { textAlign: rtl ? "right" : "left" },
          }}
        />

        {/* EMAIL FIELD */}
        <TextField
          type="email"
          label={rtl ? "אימייל" : "Email"}
          {...register("email", { required: true })}
          required
          InputLabelProps={{
            sx: {
              right: rtl ? 18 : "auto",
              left: rtl ? "auto" : 18,
              transformOrigin: rtl ? "top right" : "top left",
            },
          }}
          inputProps={{
            style: { textAlign: rtl ? "right" : "left" },
          }}
        />

        {/* MESSAGE FIELD */}
        <TextField
          multiline
          rows={4}
          label={rtl ? "הודעה..." : "Message..."}
          {...register("message", { required: true })}
          required
          InputLabelProps={{
            sx: {
              right: rtl ? 18 : "auto",
              left: rtl ? "auto" : 18,
              transformOrigin: rtl ? "top right" : "top left",
            },
          }}
          inputProps={{
            style: { textAlign: rtl ? "right" : "left" },
          }}
        />

        {/* SUCCESS ALERT */}
        {status === "success" && (
          <Alert severity="success">
            {rtl ? "ההודעה נשלחה!" : "Message sent!"}
          </Alert>
        )}

        {/* ERROR ALERT */}
        {status === "error" && (
          <Alert severity="error">
            {rtl ? "שגיאה בשליחה" : "Error sending message"}
          </Alert>
        )}

        {/* SUBMIT BUTTON */}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? (rtl ? "שולח..." : "Sending...") : ui.contactSend}
        </Button>
      </Box>
    </Box>
  );
}
