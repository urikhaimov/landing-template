"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const NavbarCSR = dynamic(() => import("./Navbar"), {
  ssr: false,
  loading: () => null,
});

export default function NavbarLoader() {
  return (
    <Suspense fallback={null}>
      <NavbarCSR />
    </Suspense>
  );
}
