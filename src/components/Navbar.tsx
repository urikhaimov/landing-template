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

  // Hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (y > lastY && y > 100) setHidden(true);
      else setHidden(false);

      setLastY(y);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

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
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: hidden ? "-90px" : "0",
          transition: "top 0.35s ease, background 0.25s ease",
          background:
            mode === "dark"
              ? "rgba(15,15,15,0.65)"
              : "rgba(255,255,255,0.65)",
          backdropFilter: "blur(16px)",
          borderBottom:
            mode === "dark"
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.06)",
          height: 76,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: "1400px",
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src={mode === "dark" ? "/logo-dark.png" : "/logo.png"}
              alt="Logo"
              width={40}
              height={40}
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo("#hero")}
            />
          </Box>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {links.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  px: 1,
                  color: mode === "dark" ? "#fff" : "#111",
                  opacity: 0.9,
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Button
              variant="outlined"
              size="small"
              onClick={toggleLang}
              sx={{ minWidth: 90 }}
            >
              {ui.toggleLang}
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={toggleMode}
              sx={{ minWidth: 110 }}
            >
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

          {/* MOBILE MENU BUTTON */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor={isRTL ? "right" : "left"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            p: 2,
            background: mode === "dark" ? "#111" : "#f8f8f8",
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
            <ListItemButton
              key={item.id}
              onClick={() => scrollTo(item.id)}
              sx={{ textAlign: isRTL ? "right" : "left" }}
            >
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
