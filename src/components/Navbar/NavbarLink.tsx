"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import type { ReactNode } from "react";

interface NavbarLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavbarLink({ href, children }: NavbarLinkProps) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        textDecoration: "none",
        color: "inherit",
        fontWeight: 500,
        "&:hover": { opacity: 0.7 },
      }}
    >
      {children}
    </Box>
  );
}
