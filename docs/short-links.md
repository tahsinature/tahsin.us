# Short-link landing pages and previews

`/short` and `/short/*` have a standalone fallback page and server-rendered
Open Graph / Twitter metadata. Ordinary invalid routes keep the existing 404.
Fallbacks describe unavailable access without promising a future meeting.

Visitors can share `https://tahsin.us/short/<slug>` directly. The browser shows a
Three.js portal while the server checks the corresponding Short.io link. After
about 5 seconds, an available link opens its destination automatically; a
missing link settles into the themed fallback. A temporary lookup failure gets
its own message and a retry link. `/short` and
the generic `/short/404` skip the lookup because they have no original slug.

The lookup uses a four-second timeout and manual HEAD requests only to the
configured short domain. It follows up to five aliases on that domain, stops
before visiting the final meeting URL, and rejects redirects into this app’s
`/short` routes to avoid loops. Protected/cloaked links serving HTTP 200 open the
original short URL so their own access screen can run. Results are not cached;
a newly configured destination is available on the next visit.

The original HTML still includes the configured sharing metadata. Navigation
runs in the browser, so crawlers do not need to execute the lookup to read the
title, description, or thumbnail. Actual WhatsApp previews still need testing
after deployment.

## Configuration

Edit `shared/short-links.ts`. The page and server use the same resolver:

1. An exact slug entry in `shortLinkConfig.links` wins.
2. Otherwise a whole word in `meetingKeywords` selects the meeting theme.
3. All other slugs use the general theme.

Change `themes.meeting` to update every meeting fallback. Add a `links` entry
to customize one link, including its page copy and preview independently:

```ts
links: {
  "project-zoom": {
    theme: "meeting",
    title: "Project catch-up access isn’t available.",
    preview: {
      title: "Project catch-up",
      description: "Meeting access and updates for the project catch-up.",
      image: "/short-link-previews/project-catch-up.png",
      imageAlt: "Project catch-up meeting",
    },
  },
} as Record<string, ShortLinkOverride>,
```

Keys are lowercase, URL-decoded slugs without `/short/` or a trailing slash.
Unspecified fields inherit from the selected theme. These settings are public;
do not put meeting passwords, private join URLs, or secrets here.

Set `origin` to the publicly accessible website origin. Preview image URLs are
made absolute using it. Both themes reuse the square logo selected in
`shared/favicons.ts`, with a Twitter summary card for a compact preview.
The 1200×630 PNG designs in `public/short-link-previews/` remain available
as optional per-link images. You can also point any theme/link at a public
PNG/JPEG URL. A configuration change requires rebuilding and redeploying the
app. No admin editor or Short.io account changes are included.

`handoff` configures the transition wording and `durationMs` (5000 by default).
The route line fills once over that same duration; a quick successful lookup
does not complete the line early. Reduced motion shows a static filled line.
Three.js loads only for the handoff, renders at a capped pixel ratio/frame rate,
and releases its resources when the page leaves. Reduced motion uses a static
portal without loading Three.js; unsupported WebGL also has a static fallback.

## Short.io setup

The short domain is `https://url.tahsin.us` (`shortOrigin` in the configuration).
`retryMode` controls “Try again”:

- `"portal"` (default): reloads the current `/short/...` path on the current
  host, preserving its query string, replaying the portal and checking the link
  again. Local debugging stays on localhost instead of visiting production.
- `"short-link"`: opens `shortOrigin` with the original slug, without the
  `/short` prefix. `/short/Team-Zoom` retries
  `https://url.tahsin.us/Team-Zoom`. Capitalization is preserved; fallback query
  parameters are not forwarded.

The backend lookup always uses `shortOrigin` in either mode. Keep it pointing
at the real short-link service, or a dedicated staging short domain. `origin`
is the public website address used for preview metadata, not the retry host.
The retry link is hidden when no original slug is available, including the
generic `/short/404`. There is no automatic retry or redirect loop.

Use `https://tahsin.us/short/project-zoom` as a planned link’s temporary
destination, then replace its destination with the real meeting URL when ready.

A missing-link fallback fixed at `https://tahsin.us/short/404` cannot reveal the
original short slug to this app. It will show the general fallback. To select a
theme or exact override, the incoming URL must carry the slug, either as
`/short/project-zoom` or `/short/404?slug=project-zoom`. Set Short.io’s Page not
found redirect to `https://tahsin.us/short/$1` to forward the missing path.
If a wildcard `*` link overrides that setting, update its destination too.
Do not infer the slug from the referrer.

Short.io also supports a wildcard `*` short link that replaces the basic
non-existing-link redirect and allows regular link features:
https://docs.short.io/articles/features/features/how-to-use-404-redirect-with-all-features

Its Social Media Preview feature (Pro and above) can override destination
metadata. If enabled, make those values consistent with the website settings:
https://docs.short.io/articles/features/features/how-to-set-up-social-media-preview

## Verification

Run `bun run build`, `bun run test:unit`, and
`bun run lint`. Vite development and the production Hono server both insert
metadata into the initial HTML. `vite preview` alone uses the static build and
does not run the production metadata route; use `bun server/index.ts` to test it.

Check `/short/404`, `/short/zoom`, and `/short/404?slug=team-meeting`, plus an
ordinary invalid route. Fetch the HTML without JavaScript to check `og:title`,
`og:description`, and an absolute `og:image`. These landing pages return 200
with `noindex, nofollow`; they are useful fallback pages rather than broken
website routes.

After deployment, share a real Short.io link in WhatsApp and check its preview
and destination. Localhost cannot be fetched by WhatsApp. Platforms may retain
cached previews after metadata or destinations change; website metadata cannot
force a refresh. A changed image filename helps avoid stale image caches.
