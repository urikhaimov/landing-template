"use client";
import Image from "next/image";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";

import { useContext, useState } from "react";
import { AppContext } from "../lib/AppContext";

export default function Navbar() {
  const { ui, toggleLang, toggleMode, mode, lang } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  // Add shadow when scrolled
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return (
    <>
     <AppBar
  position="fixed"
  elevation={trigger ? 4 : 0}
  sx={{
    backgroundColor: trigger
      ? (mode === "dark" ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.8)")
      : "transparent",
    backdropFilter: trigger ? "blur(16px)" : "none",
    boxShadow: trigger ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
    transition: "0.3s ease",
  }}
>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: lang === "he" ? "row-reverse" : "row",
          }}
        >
          {/* LOGO */}
          <Box sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
            <Image
                src={mode === "dark" ? "/logo-dark.png" : "/logo.png"}
                alt="Landing Logo"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
                />
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button href="#services">{ui.servicesTitle}</Button>
            <Button href="#testimonials">{ui.reviewsTitle}</Button>
            <Button href="#faq">{ui.faqTitle}</Button>
            <Button href="#contact">{ui.callToAction}</Button>

            <Button variant="outlined" size="small" onClick={toggleLang}>
              {ui.toggleLang}
            </Button>

            <Button variant="outlined" size="small" onClick={toggleMode}>
              {ui.getToggleThemeLabel(mode)}
            </Button>

            {/* WhatsApp */}
            <IconButton
              size="small"
              href="https://wa.me/972547401813"
              target="_blank"
              sx={{ color: "#25D366" }}
            >
              <WhatsAppIcon />
            </IconButton>

            {/* Phone */}
            <IconButton size="small" href="tel:+972547401813">
              <PhoneIcon />
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor={lang === "he" ? "right" : "left"} open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>

          <List sx={{ mt: 2 }}>
            <ListItem disablePadding>
              <ListItemButton href="#services">
                <ListItemText primary={ui.servicesTitle} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href="#testimonials">
                <ListItemText primary={ui.reviewsTitle} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href="#faq">
                <ListItemText primary={ui.faqTitle} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href="#contact">
                <ListItemText primary={ui.callToAction} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={toggleLang}>
                <ListItemText primary={ui.toggleLang} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={toggleMode}>
                <ListItemText primary={ui.getToggleThemeLabel(mode)} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
