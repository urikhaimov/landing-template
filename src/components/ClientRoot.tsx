"use client";

import NavbarClientWrapper from "./NavbarClientWrapper";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarClientWrapper />
      {children}
    </>
  );
}
