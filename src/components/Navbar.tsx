"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemText
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";

import { AppContext } from "@/lib/AppContext";

export default function NavbarCSR() {
  const { ui, toggleLang, toggleMode, lang, mode } = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      setLastY(y);
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, [lastY]);

  const scroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: hidden ? "-80px" : 0,
          transition: "top .35s ease",
          bgcolor:
            mode === "dark"
              ? "rgba(20,20,20,0.55)"
              : "rgba(255,255,255,0.65)",
          backdropFilter: "blur(14px)",
          borderBottom:
            mode === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Toolbar
          sx={{
            height: 70,
            justifyContent: "space-between",
            flexDirection: lang === "he" ? "row-reverse" : "row",
          }}
        >
          {/* <Image
            src={mode === "dark" ? "/logo-dark.png" : "/logo.png"}
            alt="logo"
            width={42}
            height={42}
            style={{ cursor: "pointer" }}
            onClick={() => scroll("#hero")}
          /> */}

          {/* Desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button onClick={() => scroll("#services")}>{ui.servicesTitle}</Button>
            <Button onClick={() => scroll("#testimonials")}>{ui.reviewsTitle}</Button>
            <Button onClick={() => scroll("#faq")}>{ui.faqTitle}</Button>
            <Button onClick={() => scroll("#contact")}>{ui.callToAction}</Button>

            <Button variant="outlined" size="small" onClick={toggleLang}>
              {ui.toggleLang}
            </Button>

            <Button variant="outlined" size="small" onClick={toggleMode}>
              {ui.getToggleThemeLabel(mode)}
            </Button>

            <IconButton sx={{ color: "#25D366" }} href="https://wa.me/972547401813" target="_blank">
              <WhatsAppIcon />
            </IconButton>

            <IconButton href="tel:+972547401813">
              <PhoneIcon />
            </IconButton>
          </Box>

          {/* Mobile */}
          <IconButton sx={{ display: { xs: "flex", md: "none" } }} onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor={lang === "he" ? "right" : "left"}
      >
        <Box sx={{ width: 240, p: 2 }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>

          <ListItemButton onClick={() => scroll("#services")}>
            <ListItemText primary={ui.servicesTitle} />
          </ListItemButton>

          <ListItemButton onClick={() => scroll("#testimonials")}>
            <ListItemText primary={ui.reviewsTitle} />
          </ListItemButton>

          <ListItemButton onClick={() => scroll("#faq")}>
            <ListItemText primary={ui.faqTitle} />
          </ListItemButton>

          <ListItemButton onClick={() => scroll("#contact")}>
            <ListItemText primary={ui.callToAction} />
          </ListItemButton>

          <ListItemButton onClick={toggleLang}>
            <ListItemText primary={ui.toggleLang} />
          </ListItemButton>

          <ListItemButton onClick={toggleMode}>
            <ListItemText primary={ui.getToggleThemeLabel(mode)} />
          </ListItemButton>
        </Box>
      </Drawer>
    </>
  );
}
