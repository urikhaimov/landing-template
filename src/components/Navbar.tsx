"use client";

import React, { useState, useContext, useRef, useEffect } from "react";
import Image from "next/image";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

import { AppContext } from "../lib/AppContext";

export default function Navbar() {
  const { ui, toggleLang, toggleMode, mode, lang } = useContext(AppContext)!;

  const [open, setOpen] = useState(false);

  // Drawer ref for focus trap
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Close drawer with Escape key
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  // Simple focus trap for mobile drawer
  useEffect(() => {
    if (!open || !drawerRef.current) return;

    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'button, a, [tabindex="0"]'
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function trap(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", trap);
    first.focus();

    return () => window.removeEventListener("keydown", trap);
  }, [open]);

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

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="skip-link"
        aria-label={lang === "he" ? "דלג לתוכן" : "Skip to main content"}
      >
        Skip to content
      </a>

      <AppBar
        component="header"
        position="fixed"
        role="navigation"
        aria-label="Main navigation"
        elevation={0}
        sx={{
          background:
            mode === "dark"
              ? "rgba(10,10,10,0.6)"
              : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(14px)",
          borderBottom:
            mode === "dark"
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 70,
            px: 2,
            flexDirection: lang === "he" ? "row-reverse" : "row",
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src={mode === "dark" ? "/logo-dark.svg" : "/logo.svg"}
              alt="Website Logo"
              width={82}
              height={82}
              priority
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo("#hero")}
            />
          </Box>

          {/* Desktop Menu */}
          <Box
            component="nav"
            aria-label="Primary"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {links.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                aria-label={link.label}
                sx={{
                  fontWeight: 500,
                  opacity: 0.9,
                  "&:hover": { opacity: 1 },
                }}
              >
                {link.label}
              </Button>
            ))}

            <Button
              variant="outlined"
              size="small"
              onClick={toggleLang}
              aria-label="Toggle Language"
            >
              {ui.toggleLang}
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={toggleMode}
              aria-label="Toggle Theme"
            >
              {ui.getToggleThemeLabel(mode)}
            </Button>

            {/* WhatsApp */}
            <IconButton
              href="https://wa.me/972547401813"
              target="_blank"
              aria-label="WhatsApp"
              sx={{ color: "#25D366" }}
            >
              <WhatsAppIcon />
            </IconButton>

            {/* Phone */}
            <IconButton
              href="tel:+972547401813"
              aria-label="Call phone"
            >
              <PhoneIcon />
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        id="mobile-menu"
        anchor={lang === "he" ? "right" : "left"}
        role="dialog"
        aria-modal="true"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          ref: drawerRef,
          sx: {
            width: 260,
            p: 2,
            background: mode === "dark" ? "#111" : "#fafafa",
          },
        }}
      >
        {/* Close button */}
        <IconButton
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          sx={{ alignSelf: "flex-end" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Links */}
        <List>
          {links.map((link) => (
            <ListItemButton
              key={link.id}
              onClick={() => scrollTo(link.id)}
              aria-label={link.label}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}

          <ListItemButton onClick={toggleLang} aria-label="Toggle language">
            <ListItemText primary={ui.toggleLang} />
          </ListItemButton>

          <ListItemButton onClick={toggleMode} aria-label="Toggle theme">
            <ListItemText primary={ui.getToggleThemeLabel(mode)} />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Floating WhatsApp Bubble */}
      <IconButton
        href="https://wa.me/972547401813"
        target="_blank"
        aria-label="WhatsApp floating button"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          bgcolor: "#25D366",
          width: 58,
          height: 58,
          borderRadius: "50%",
          color: "#fff",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          zIndex: 2000,
          "&:hover": { transform: "scale(1.07)" },
          transition: "0.2s ease",
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 34 }} />
      </IconButton>
    </>
  );
}
