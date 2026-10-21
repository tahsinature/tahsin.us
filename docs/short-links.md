# Short-link landing pages and previews

`/short` and `/short/*` have a standalone fallback page and server-rendered
Open Graph / Twitter metadata. Ordinary invalid routes keep the existing 404.
Fallbacks describe unavailable access without promising a future meeting.

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
made absolute using it. Two 1200×630 PNG designs are included in
`public/short-link-previews/`. Replace them or point any theme/link at a public
PNG/JPEG URL. A configuration change requires rebuilding and redeploying the
app. No admin editor or Short.io account changes are included.

## Short.io setup

The short domain is `https://url.tahsin.us` (`shortOrigin` in the configuration).
“Try again” opens that domain with the original slug, without the `/short`
prefix: `/short/Team-Zoom` retries `https://url.tahsin.us/Team-Zoom`.
Capitalization is preserved. Fallback query parameters are not forwarded.
The retry link is hidden when no original slug is available, including the
generic `/short/404`. There is no automatic retry or redirect loop.

Use `https://tahsin.us/short/project-zoom` as a planned link’s temporary
destination, then replace its destination with the real meeting URL when ready.

A missing-link fallback fixed at `https://tahsin.us/short/404` cannot reveal the
original short slug to this app. It will show the general fallback. To select a
theme or exact override, the incoming URL must carry the slug, either as
`/short/project-zoom` or `/short/404?slug=project-zoom`. Confirm the forwarding
capabilities in your Short.io setup; the app does not assume that the missing
path is automatically forwarded. Do not infer the slug from the referrer.

Short.io also supports a wildcard `*` short link that replaces the basic
non-existing-link redirect and allows regular link features:
https://docs.short.io/articles/features/features/how-to-use-404-redirect-with-all-features

Its Social Media Preview feature (Pro and above) can override destination
metadata. If enabled, make those values consistent with the website settings:
https://docs.short.io/articles/features/features/how-to-set-up-social-media-preview

## Verification

Run `bun run build`, `bun test server/__tests__/short-links.test.ts`, and
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
