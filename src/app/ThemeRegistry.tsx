"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";

function createEmotionCache() {
  const cache = createCache({ key: "mui", prepend: true });
  cache.compat = true;
  return cache;
}
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(createEmotionCache);

  useServerInsertedHTML(() => {
    const { inserted } = cache;
    const names = Object.keys(inserted);

    if (names.length === 0) return null;

    return (
      <style
        data-emotion={`mui ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: names.map((n) => inserted[n]).join(" "),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
