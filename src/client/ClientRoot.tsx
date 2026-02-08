"use client";

import NavbarClientWrapper from "../components/Navbar/NavbarClientWrapper";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarClientWrapper />
      {children}
    </>
  );
}
