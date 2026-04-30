"use client";

import { AppBar, Toolbar, Box, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import AppContext  from "../../lib/AppContext";
import NavbarLink from "./NavbarLink";
import MobileDrawer from "./MobileDrawer";

export default function Navbar() {
  const { ui, lang, mode, toggleLang, toggleMode } = useContext(AppContext)!;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={(theme) => ({
          bgcolor: theme.palette.background.paper, // THEME AWARE
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
          color: theme.palette.text.primary,
        })}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "1400px",
            mx: "auto",
            width: "100%",
          }}
        >
          <Box sx={{ fontWeight: 800, fontSize: "1.2rem" }}>UriTech</Box>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
            }}
          >
            <NavbarLink href="#contact">{ui.contactTitle}</NavbarLink>
            <NavbarLink href="#faq">{ui.faqTitle}</NavbarLink>
            <NavbarLink href="#testimonials">{ui.reviewsTitle}</NavbarLink>
            <NavbarLink href="#services">{ui.servicesTitle}</NavbarLink>

            {/* ACTION BUTTONS */}
            <Button
              variant="outlined"
              size="small"
              onClick={toggleLang}
              sx={(theme) => ({
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
              })}
            >
              {lang === "he" ? "ENGLISH" : "עברית"}
            </Button>

          </Box>

          {/* MOBILE MENU BUTTON */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
