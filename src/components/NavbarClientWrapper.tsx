// components/NavbarLoader.tsx
"use client";

import dynamic from "next/dynamic";

const NavbarCSR = dynamic(() => import("./Navbar"), {
  ssr: false,
});

export default function NavbarLoader() {
  return <NavbarCSR />;
}
