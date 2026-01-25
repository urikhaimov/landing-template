"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

import { AppContext } from "../lib/AppContext";

export default function Navbar() {
  const { ui, toggleLang, toggleMode, mode, lang } = useContext(AppContext);

  const isClient = typeof window !== "undefined";

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false); // navbar background change

  const lastY = useRef(0);
  const lastSpeed = useRef(0);

  // Smart scroll hide logic
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // Scrolling speed (px/ms)
      const speed = Math.abs(delta);
      lastSpeed.current = speed;

      // Auto-hide: only when scrolling down fast
      if (delta > 4 && speed > 1.2) {
        if (!hidden) setHidden(true);
      } else if (delta < -4) {
        if (hidden) setHidden(false);
      }

      // Change navbar background when scrolling
      if (y > 20) {
        if (!solid) setSolid(true);
      } else {
        if (solid) setSolid(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient, hidden, solid]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;

    setOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const links = [
    { id: "#services", label: ui.servicesTitle },
    { id: "#testimonials", label: ui.reviewsTitle },
    { id: "#faq", label: ui.faqTitle },
    { id: "#contact", label: ui.callToAction },
  ];

  if (!isClient) return null;

  return (
    <>
      {/* ----- TOP NAVBAR ----- */}
      <AppBar
        position="fixed"
        elevation={solid ? 3 : 0}
        sx={{
          top: hidden ? "-88px" : "0px",
          height: 88,
          transition: "top 0.35s ease, background 0.35s ease, box-shadow 0.35s",

          background:
            solid
              ? mode === "dark"
                ? "rgba(12,12,12,0.9)"
                : "rgba(255,255,255,0.9)"
              : "transparent",

          backdropFilter: solid ? "blur(16px)" : "none",
          borderBottom: solid
            ? mode === "dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.06)"
            : "none",

          zIndex: 3000,
        }}
      >
        <Toolbar
          sx={{
            height: 88,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: lang === "he" ? "row-reverse" : "row",
            px: 2,
          }}
        >
          {/* Logo */}
          <Image
            src={mode === "dark" ? "/logo-dark.png" : "/logo.png"}
            alt="Logo"
            width={44}
            height={44}
            style={{ cursor: "pointer" }}
            onClick={() => scrollTo("#hero")}
          />

          {/* Desktop menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {links.map((link) => (
              <Button key={link.id} onClick={() => scrollTo(link.id)}>
                {link.label}
              </Button>
            ))}

            <Button variant="outlined" onClick={toggleLang}>
              {ui.toggleLang}
            </Button>

            <Button variant="outlined" onClick={toggleMode}>
              {ui.getToggleThemeLabel(mode)}
            </Button>

            <IconButton href="https://wa.me/972547401813">
              <WhatsAppIcon />
            </IconButton>

            <IconButton href="tel:+972547401813">
              <PhoneIcon />
            </IconButton>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ----- MOBILE DRAWER ----- */}
      <Drawer
        anchor={lang === "he" ? "right" : "left"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            p: 2,
            background: mode === "dark" ? "#111" : "#fafafa",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {links.map((link) => (
          <ListItemButton key={link.id} onClick={() => scrollTo(link.id)}>
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}

        <ListItemButton onClick={toggleLang}>
          <ListItemText primary={ui.toggleLang} />
        </ListItemButton>

        <ListItemButton onClick={toggleMode}>
          <ListItemText primary={ui.getToggleThemeLabel(mode)} />
        </ListItemButton>
      </Drawer>

      {/* ----- FLOATING MOBILE BOTTOM BAR (iPhone style) ----- */}
      <Paper
        elevation={6}
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "24px",
          padding: "10px 18px",
          gap: 3,
          zIndex: 2800,
          background: mode === "dark" ? "#222" : "#fff",
        }}
      >
        <IconButton href="https://wa.me/972547401813">
          <WhatsAppIcon sx={{ fontSize: 28 }} />
        </IconButton>

        <IconButton onClick={() => scrollTo("#contact")}>
          <PhoneIcon sx={{ fontSize: 28 }} />
        </IconButton>

        <IconButton onClick={toggleMode}>
          {ui.getToggleThemeLabel(mode)}
        </IconButton>
      </Paper>
    </>
  );
}
