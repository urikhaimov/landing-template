"use client";

import { Drawer, Box, Button } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../lib/AppContext";
import NavbarLink from "./NavbarLink";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { ui, lang, mode, toggleLang, toggleMode } = useContext(AppContext)!;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={(theme) => ({
          width: 240,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: theme.palette.background.default,
          height: "100%",
        })}
      >
        <NavbarLink href="#contact">{ui.contactTitle}</NavbarLink>
        <NavbarLink href="#testimonials">{ui.reviewsTitle}</NavbarLink>
        <NavbarLink href="#faq">{ui.faqTitle}</NavbarLink>
        <NavbarLink href="#services">{ui.servicesTitle}</NavbarLink>

        <Button onClick={toggleLang}>
          {lang === "he" ? "ENGLISH" : "עברית"}
        </Button>
         <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            href="https://wa.me/972547401813"
            target="_blank"
            
            rel="noopener noreferrer"
            sx={{
              bgcolor: "#25D366",
              color: "#fff",
               direction: "ltr",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#1ebe5d",
              },
            }}
          >
            WhatsApp
          </Button>

        
      </Box>
    </Drawer>
  );
}
