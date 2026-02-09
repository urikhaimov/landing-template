"use client";

import createCache from "@emotion/cache";

export function createEmotionCache(direction: "rtl" | "ltr") {
  return createCache({
    key: direction === "rtl" ? "mui-rtl" : "mui-ltr",
  });
}
