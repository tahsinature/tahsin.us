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
3. [Components](https://www.mapcn.dev/docs/basic-map)
5. Markers

# Markers

Add interactive markers to your map with popups and tooltips.

Use `MapMarker` to place markers on the map. Each marker can have custom content, popups that open on click, and tooltips that appear on hover.

**Performance tip:**`MapMarker` is DOM-based and works best for a few hundred markers. For larger datasets, see the [GeoJSON layers example](https://www.mapcn.dev/docs/advanced-usage#example-markers-via-layers) instead. Rendering many DOM markers can make the browser sluggish.

## Basic Example

Simple markers with tooltips and popups showing location information.

PreviewCode

© [CARTO](https://carto.com/about-carto/), © [OpenStreetMap](http://www.openstreetmap.org/about/) contributors

## Rich Popups

Build complex popups with images, ratings, and action buttons using shadcn/ui components.

PreviewCode

Museum

Landmark

Transit

© [CARTO](https://carto.com/about-carto/), © [OpenStreetMap](http://www.openstreetmap.org/about/) contributors

## Draggable Marker

Create draggable markers that users can move around the map. Click the marker to see its current coordinates in a popup.

PreviewCode

© [CARTO](https://carto.com/about-carto/), © [OpenStreetMap](http://www.openstreetmap.org/about/) contributors

[Controls](https://www.mapcn.dev/docs/controls) [Popups](https://www.mapcn.dev/docs/popups)

On This Page

[Basic Example](https://www.mapcn.dev/docs/markers#basic-example) [Rich Popups](https://www.mapcn.dev/docs/markers#rich-popups) [Draggable Marker](https://www.mapcn.dev/docs/markers#draggable-marker)