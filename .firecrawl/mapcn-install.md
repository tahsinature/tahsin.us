[mapcn](https://www.mapcn.dev/) Search docs... `⌘K`

## Search Documentation

Search for documentation pages and components

Basics

- [Getting Started](https://www.mapcn.dev/docs)
- [Installation](https://www.mapcn.dev/docs/installation)
- [API Reference](https://www.mapcn.dev/docs/api-reference)

Components

- [Map](https://www.mapcn.dev/docs/basic-map)
- [Controls](https://www.mapcn.dev/docs/controls)
- [Markers](https://www.mapcn.dev/docs/markers)
- [Popups](https://www.mapcn.dev/docs/popups)
- [Routes](https://www.mapcn.dev/docs/routes)
- [Clusters](https://www.mapcn.dev/docs/clusters)
- [Advanced](https://www.mapcn.dev/docs/advanced-usage)

Toggle theme

Toggle Sidebar

1. [Docs](https://www.mapcn.dev/docs)
3. [Basics](https://www.mapcn.dev/docs)
5. Installation

# Installation

How to install and set up mapcn in your project.

## Prerequisites

A project with [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) set up.

## Installation

Run the following command to add the map component:

```
npx shadcn@latest add @mapcn/map
```

This will install `maplibre-gl` and add the map component to your project.

## Usage

Import and use the map component:

```
import { Map, MapControls } from "@/components/ui/map";
import { Card } from "@/components/ui/card";

export function MyMap() {
  return (
    <Card className="h-[320px] p-0 overflow-hidden">
      <Map center={[-74.006, 40.7128]} zoom={11}>
        <MapControls />
      </Map>
    </Card>
  );
}
```

© [CARTO](https://carto.com/about-carto/), © [OpenStreetMap](http://www.openstreetmap.org/about/) contributors

**Note:** The map uses free CARTO basemap tiles by default. No API key required. Tiles automatically switch between light and dark themes.

[Introduction](https://www.mapcn.dev/docs) [API Reference](https://www.mapcn.dev/docs/api-reference)

On This Page

[Prerequisites](https://www.mapcn.dev/docs/installation#prerequisites) [Installation](https://www.mapcn.dev/docs/installation#installation) [Usage](https://www.mapcn.dev/docs/installation#usage)