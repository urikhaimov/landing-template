"use client";

import Link from "next/link";
import { Box } from "@mui/material";

export default function NavbarLink({ href, children }) {
  return (
    <Box
      component={Link}
      href={href}
      sx={(theme) => ({
        position: "relative",
        color: theme.palette.text.primary,
        fontWeight: 500,
        px: 1,
        py: 0.5,

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -3,
          left: 0,
          width: 0,
          height: "2px",
          bgcolor: theme.palette.primary.main,
          transition: "width 0.3s ease",
        },

        "&:hover::after": {
          width: "100%",
        },
      })}
    >
      {children}
    </Box>
  );
}
