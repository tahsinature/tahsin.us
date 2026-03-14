# Directives

Custom components rendered from Notion toggles. A toggle becomes a directive when it contains a **code block with `@type:`**.

## Terminology

- **Directive** — the component type (`card`, `quote`, `image`, `heading`, etc.). Declared via `@type: <name>`.
- **Annotation** — the `@key: value` config lines (`@title`, `@accent`, `@author`, etc.). `@type` is not an annotation — it identifies the directive.

## How It Works

1. Toggle contains a **code block** with `@type: <name>` + annotations
2. Everything outside the code block is **content** (text, images, page links)
3. No code block or no `@type:` → normal toggle

```
▶ My Reference Label (ignored — never used as title)
  ├── content: text, images, <page> links, <audio>/<video> tags
  └── code block: @type, @key: value annotations
```

**Annotation syntax:** `@key: value` (key-value) or `@flag` (boolean).
**Content extraction:** `![](url)` → images, `<page url="...">` → page links, `<audio src="...">` → media, remaining text → body.
**Variant matching:** `@type: quote-minimal` resolves to `quote` directive with `variant: "minimal"` prop.

---

## Directives

### `card`

Compact row card with thumbnail slideshow and optional page link.

| Annotation     | Description          |
| -------------- | -------------------- |
| `@title`       | Card heading         |
| `@description` | Subtitle / body text |

Auto-extracts: first image (thumbnail), all images (slideshow), first `<page>` (navigation), body text.

---

### `image` / `image-*`

Single image showcase with styling variants. Clicks open the page lightbox.

| Variant           | Description                             |
| ----------------- | --------------------------------------- |
| `image`           | Clean card with rounded border          |
| `image-polaroid`  | Tilted polaroid frame with white border |
| `image-browser`   | Fake browser chrome for screenshots     |
| `image-spotlight` | Dark background with colored glow       |
| `image-float`     | Subtle shadow + rotation, floating feel |

| Annotation | Default   | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `@title`   | —         | Heading (or URL bar text for `browser`)        |
| `@caption` | —         | Text below image (body as fallback)            |
| `@source`  | —         | Attribution after caption                      |
| `@alt`     | —         | Alt text (falls back to title)                 |
| `@width`   | `medium`  | `small` / `half` / `medium` / `large` / `full` |
| `@accent`  | `primary` | Color keyword or hex (e.g. `blue`, `#f43f5e`)  |

---

### `image-grid`

Responsive image grid with lightbox.

| Annotation  | Default | Description                                        |
| ----------- | ------- | -------------------------------------------------- |
| `@title`    | —       | Heading above the grid                             |
| `@columns`  | `3`     | Number of columns                                  |
| `@max-show` | all     | Max visible images; overflow shows "+N more" badge |
| `@isolated` | —       | Flag — opens its own lightbox instead of global    |

---

### `hero-card`

Large hero banner with animated cover images and page link grid.

| Annotation     | Default | Description                    |
| -------------- | ------- | ------------------------------ |
| `@title`       | —       | Overlaid on the hero image     |
| `@description` | —       | Subtitle overlaid on hero      |
| `@columns`     | `1`     | Columns for the page-link grid |

Auto-extracts: all images (animated cover), all `<page>` tags (navigable buttons).

---

### `heading` / `heading-*`

Styled section headers.

| Variant            | Description                               |
| ------------------ | ----------------------------------------- |
| `heading`          | Accent underline with dots                |
| `heading-gradient` | Gradient text with tinted background      |
| `heading-numbered` | Big number + title (step-by-step)         |
| `heading-center`   | Centered text with decorative side lines  |
| `heading-split`    | Title left, subtitle right, bottom border |
| `heading-pill`     | Colored pill badge beside the title       |

| Annotation  | Default   | Description                                  |
| ----------- | --------- | -------------------------------------------- |
| `@title`    | —         | Main heading text                            |
| `@subtitle` | —         | Description below heading (body as fallback) |
| `@label`    | —         | Small uppercase label above/beside the title |
| `@number`   | `01`      | Number for the `numbered` variant            |
| `@accent`   | `primary` | Color keyword or hex                         |

---

### `quote` / `quote-*`

Stylised pull-quote with optional attribution.

| Variant          | Description                                |
| ---------------- | ------------------------------------------ |
| `quote`          | Card with left accent bar + quote mark     |
| `quote-minimal`  | Clean left-border only, no background      |
| `quote-large`    | Centered, oversized text                   |
| `quote-bordered` | Card with top/bottom gradient accent lines |

| Annotation | Default   | Description               |
| ---------- | --------- | ------------------------- |
| `@author`  | —         | Person being quoted       |
| `@source`  | —         | Book, talk, article, etc. |
| `@accent`  | `primary` | Color keyword or hex      |

Body text becomes the quote content.

---

### `checkbox`

Styled checkbox list with per-item checked/unchecked state. Parses `- [x]` / `- [ ]` markdown syntax. Supports nesting via indentation.

| Annotation  | Default | Description                            |
| ----------- | ------- | -------------------------------------- |
| `@title`    | —       | Heading above the list                 |
| `@accent`   | `green` | Color for checked boxes                |
| `@progress` | —       | Flag — shows a progress bar with count |

---

### `list` / `list-*`

Editorial styled lists. Body content is rendered as markdown, so nested lists work automatically.

| Variant         | Description                                      |
| --------------- | ------------------------------------------------ |
| `list`          | Clean list with accent dot markers               |
| `list-timeline` | Vertical line with connected dots                |
| `list-cards`    | Each item as a mini card with accent left border |
| `list-numbered` | Big styled leading-zero numbers                  |

| Annotation | Default   | Description          |
| ---------- | --------- | -------------------- |
| `@title`   | —         | Heading above list   |
| `@accent`  | `primary` | Color keyword or hex |

Body text (markdown list) becomes the list content.

---

### `retro-disk`

Vinyl record audio player with spinning animation.

| Annotation | Description    |
| ---------- | -------------- |
| `@title`   | Track name     |
| `@artist`  | Artist / album |

Extracts `<audio src="...">` from content.

---

## Architecture

```
directives/
├── parser.ts          # Detects directives, parses annotations + content
├── registry.ts        # Maps names → config (hosts, annotations, extraction rules)
├── types.ts           # DirectiveProps, DirectiveConfig
├── index.tsx          # RenderDirective — resolves + renders component
├── contexts.ts        # file:// URI → signed URL resolution
├── DirectiveError.tsx # Warning box for parse errors
└── toggle/            # All directive components
```

## Adding a New Directive

1. **Register** in `registry.ts` — define hosts, annotations, extraction flags
2. **Create** component in `toggle/` or `audio/`
3. **Wire** in `index.tsx` — add to the directives map

No parser or MarkdownRenderer changes needed.
