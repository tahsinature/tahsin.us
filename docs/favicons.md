# Favicon collection

Current: **01 — Interlocked MT**.

Choose a design in `shared/favicons.ts`:

```ts
export const faviconConfig = {
  activeFavicon: "interlocked-mt", // e.g. "mint-circuit" or "ivory-serif"
};
```

Rebuild and deploy after changing it. Vite inserts the selected ICO, PNG, and
Apple touch icon into the initial HTML. The header logo reads the same setting.
Each variant has its own URL, so switching designs does not reuse the old icon URL.

The nine shortlisted designs live under `public/favicon-variants/`.
Each directory contains `design.png` (512px), `favicon.png` (256px), a multi-size
`favicon.ico` (16–256px), and `apple-touch-icon.png` (180px).

- **01 — Interlocked MT**: `01-interlocked-mt/`
- **03 — Mint circuit**: `03-mint-circuit/`
- **04 — Cobalt fold**: `04-cobalt-fold/`
- **05 — Ivory serif**: `05-ivory-serif/`
- **06 — Coral cut**: `06-coral-cut/`
- **07 — Shutter mark**: `07-shutter-mark/`
- **08 — Terminal T**: `08-terminal-t/`
- **09 — Terracotta MT**: `09-terracotta-mt/`
- **10 — Architect’s T**: `10-architects-t/`

`public/favicon-lab/` is the temporary comparison gallery. Delete that folder
when finished; the preserved collection and installed favicon do not depend on it.
