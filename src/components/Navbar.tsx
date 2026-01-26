"use client";

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

import { AppContext } from "../lib/AppContext";

export default function Navbar() {
  const { ui, toggleLang, toggleMode, mode, lang } = useContext(AppContext);
  const isRTL = lang === "he";

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [active, setActive] = useState<string>("hero");

  /* ────────────────────────────────
     ACTIVE SECTION (Scroll Spy)
  ───────────────────────────────── */
  useEffect(() => {
    const handleSpy = () => {
      const sections = ["hero", "services", "testimonials", "faq", "contact"];
      let current = "hero";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          current = id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleSpy);
    return () => window.removeEventListener("scroll", handleSpy);
  }, []);

  /* ────────────────────────────────
     Hide navbar on scroll down
  ───────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 120) setHidden(true);
      else setHidden(false);
      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  /* ────────────────────────────────
     Smooth scrolling
  ───────────────────────────────── */
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;
    setOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const links = [
    { id: "#services", key: "services", label: ui.servicesTitle },
    { id: "#testimonials", key: "testimonials", label: ui.reviewsTitle },
    { id: "#faq", key: "faq", label: ui.faqTitle },
    { id: "#contact", key: "contact", label: ui.callToAction },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: hidden ? "-95px" : "0",
          transition: "top 0.35s ease, background 0.25s ease",
          background:
            mode === "dark"
              ? "rgba(20,20,20,0.70)"
              : "rgba(255,255,255,0.70)",
          backdropFilter: "blur(14px)",
          borderBottom:
            mode === "dark"
              ? "1px solid rgba(80,80,80,0.25)"
              : "1px solid rgba(0,0,0,0.07)",
          height: 78,
          zIndex: 2000,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: "1400px",
            mx: "auto",
            width: "100%",
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          {/* ───────── Logo ───────── */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src={mode === "dark" ? "/logo-dark.svg" : "/logo.svg"}
              alt="Logo"
              width={80}
              height={80}
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo("#hero")}
            />
          </Box>

          {/* ───────── Desktop Menu ───────── */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
              mx: "auto",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {links.map((item) => {
              const isActive = item.key === active;
              return (
                <Box
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  sx={{
                    cursor: "pointer",
                    position: "relative",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: isActive ? "1rem" : "0.95rem",
                    color: mode === "dark" ? "#fff" : "#000",
                    opacity: isActive ? 1 : 0.8,
                    transition: "0.25s",
                    paddingBottom: "4px",
                    "&:hover": {
                      opacity: 1,
                      transform: "translateY(-2px)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      [isRTL ? "right" : "left"]: 0,
                      width: isActive ? "100%" : "0%",
                      height: "3px",
                      background:
                        mode === "dark" ? "cyan" : "dodgerblue",
                      borderRadius: "2px",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {item.label}
                </Box>
              );
            })}
          </Box>

          {/* ───────── Desktop Actions ───────── */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Button variant="outlined" onClick={toggleLang} size="small">
              {ui.toggleLang}
            </Button>

            <Button variant="outlined" onClick={toggleMode} size="small">
              {ui.getToggleThemeLabel(mode)}
            </Button>

            <IconButton
              href="https://wa.me/972547401813"
              target="_blank"
              sx={{ color: "#25D366" }}
            >
              <WhatsAppIcon />
            </IconButton>

            <IconButton href="tel:+972547401813">
              <PhoneIcon />
            </IconButton>
          </Box>

          {/* ───────── Mobile Menu Button ───────── */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ───────── Mobile Drawer ───────── */}
      <Drawer
        anchor={isRTL ? "right" : "left"}
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

        <List sx={{ mt: 1 }}>
          {links.map((item) => (
            <ListItemButton key={item.id} onClick={() => scrollTo(item.id)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

          <ListItemButton onClick={toggleLang}>
            <ListItemText primary={ui.toggleLang} />
          </ListItemButton>

          <ListItemButton onClick={toggleMode}>
            <ListItemText primary={ui.getToggleThemeLabel(mode)} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}
