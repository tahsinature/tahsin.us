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
5. API Reference

# API Reference

Complete reference for all map components and their props.

**Note:** This library is built on top of [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/API/). Most components extend the native MapLibre options. Refer to the [MapLibre Map API](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/) for additional options not listed here.

## Component Anatomy

All parts of the component that you can use and combine to build your map.

```
<Map>
  <MapMarker longitude={...} latitude={...}>
    <MarkerContent>
      <MarkerLabel />
    </MarkerContent>
    <MarkerPopup />
    <MarkerTooltip />
  </MapMarker>

  <MapPopup longitude={...} latitude={...} />
  <MapControls />
  <MapRoute coordinates={...} />
  <MapClusterLayer data={...} />
</Map>
```

## Map

The root container component that initializes MapLibre GL and provides context to child components. Automatically handles theme switching between light and dark modes.

Extends [MapOptions](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/) from MapLibre GL (excluding `container` and`style`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `—` | Child components (markers, popups, controls, routes). |
| `className` | `string` | `—` | Additional CSS classes for the map container. |
| `theme` | `"light" | "dark"` | `—` | Theme for the map. If not provided, automatically detects from document class or system preference. |
| `styles` | `{ light?: string | StyleSpecification; dark?: string | StyleSpecification }` | `—` | Custom map styles for light and dark themes. Overrides the default Carto base map tiles. |
| `projection` | `ProjectionSpecification` | `—` | Map projection type. Use { type: "globe" } for 3D globe view. |
| `viewport` | `Partial<MapViewport>` | `—` | Controlled viewport state. When used with onViewportChange, enables controlled mode. Can also be used alone for initial viewport. |
| `onViewportChange` | `(viewport: MapViewport) => void` | `—` | Callback fired continuously as the viewport changes (during pan, zoom, rotate). Can be used alone to observe changes, or with viewport prop to enable controlled mode. |

## useMap

A hook that provides access to the MapLibre map instance and loading state. Must be used within a `Map` component.

```
const { map, isLoaded } = useMap();
```

Returns `map` ( [MapLibre.Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)) and `isLoaded` (boolean) tells you if the map is loaded and ready to use.

## MapControls

Renders map control buttons (zoom, compass, locate, fullscreen). Must be used inside `Map`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top-left" | "top-right" | "bottom-left" | "bottom-right"` | `"bottom-right"` | Position of the controls on the map. |
| `showZoom` | `boolean` | `true` | Show zoom in/out buttons. |
| `showCompass` | `boolean` | `false` | Show compass button to reset bearing. |
| `showLocate` | `boolean` | `false` | Show locate button to find user's location. |
| `showFullscreen` | `boolean` | `false` | Show fullscreen toggle button. |
| `className` | `string` | `—` | Additional CSS classes for the controls container. |
| `onLocate` | `(coords: { longitude: number; latitude: number }) => void` | `—` | Callback with user coordinates when located. |

## MapMarker

A container for marker-related components. Provides context for its children and handles marker positioning.

Extends [MarkerOptions](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MarkerOptions/) from MapLibre GL (excluding `element`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `longitude` | `number` | `—` | Longitude coordinate for marker position. |
| `latitude` | `number` | `—` | Latitude coordinate for marker position. |
| `children` | `ReactNode` | `—` | Marker subcomponents (MarkerContent, MarkerPopup, etc). |
| `onClick` | `(e: MouseEvent) => void` | `—` | Callback when marker is clicked. |
| `onMouseEnter` | `(e: MouseEvent) => void` | `—` | Callback when mouse enters marker. |
| `onMouseLeave` | `(e: MouseEvent) => void` | `—` | Callback when mouse leaves marker. |
| `onDragStart` | `(lngLat: {lng, lat}) => void` | `—` | Callback when marker drag starts (requires draggable: true). |
| `onDrag` | `(lngLat: {lng, lat}) => void` | `—` | Callback during marker drag (requires draggable: true). |
| `onDragEnd` | `(lngLat: {lng, lat}) => void` | `—` | Callback when marker drag ends (requires draggable: true). |

## MarkerContent

Renders the visual content of a marker. Must be used inside`MapMarker`. If no children provided, renders a default blue dot marker.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `—` | Custom marker content. Defaults to a blue dot. |
| `className` | `string` | `—` | Additional CSS classes for the marker container. |

## MarkerPopup

Renders a popup attached to the marker that opens on click. Must be used inside `MapMarker`.

Extends [PopupOptions](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/PopupOptions/) from MapLibre GL (excluding `className` and`closeButton`).

The `className` and`closeButton` from MapLibre's PopupOptions are excluded to prevent style conflicts. Use the component's own props to style the popup. MapLibre's default popup styles are reset via CSS.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `—` | Popup content. |
| `className` | `string` | `—` | Additional CSS classes for the popup container. |
| `closeButton` | `boolean` | `false` | Show a close button in the popup. |

## MarkerTooltip

Renders a tooltip that appears on hover. Must be used inside`MapMarker`.

Extends [PopupOptions](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/PopupOptions/) from MapLibre GL (excluding `className`,`closeButton`, and`closeOnClick` as tooltips auto-dismiss on hover out).

The `className` from MapLibre's PopupOptions is excluded to prevent style conflicts. Use the component's own`className` prop to style the tooltip content. MapLibre's default popup styles are reset via CSS.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `—` | Tooltip content. |
| `className` | `string` | `—` | Additional CSS classes for the tooltip container. |

## MarkerLabel

Renders a text label above or below the marker. Must be used inside`MarkerContent`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `—` | Label text content. |
| `className` | `string` | `—` | Additional CSS classes for the label. |
| `position` | `"top" | "bottom"` | `"top"` | Position of the label relative to the marker. |

## MapPopup

A standalone popup component that can be placed anywhere on the map without a marker. Must be used inside `Map`.

Extends [PopupOptions](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/PopupOptions/) from MapLibre GL (excluding `className` and`closeButton`).

The `className` and`closeButton` from MapLibre's PopupOptions are excluded to prevent style conflicts. Use the component's own props to style the popup. MapLibre's default popup styles are reset via CSS.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `longitude` | `number` | `—` | Longitude coordinate for popup position. |
| `latitude` | `number` | `—` | Latitude coordinate for popup position. |
| `onClose` | `() => void` | `—` | Callback when popup is closed. |
| `children` | `ReactNode` | `—` | Popup content. |
| `className` | `string` | `—` | Additional CSS classes for the popup container. |
| `closeButton` | `boolean` | `false` | Show a close button in the popup. |

## MapRoute

Renders a line/route on the map connecting coordinate points. Must be used inside `Map`. Supports click and hover interactions for building route selection UIs.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | `undefined (auto-generated)` | Optional unique identifier for the route layer. Auto-generated if not provided. |
| `coordinates` | `[number, number][]` | `—` | Array of \[longitude, latitude\] coordinate pairs. |
| `color` | `string` | `"#4285F4"` | Line color (CSS color value). |
| `width` | `number` | `3` | Line width in pixels. |
| `opacity` | `number` | `0.8` | Line opacity (0 to 1). |
| `dashArray` | `[number, number]` | `—` | Dash pattern \[dash length, gap length\] for dashed lines. |
| `onClick` | `() => void` | `—` | Callback when the route line is clicked. |
| `onMouseEnter` | `() => void` | `—` | Callback when mouse enters the route line. |
| `onMouseLeave` | `() => void` | `—` | Callback when mouse leaves the route line. |
| `interactive` | `boolean` | `true` | Whether the route is interactive (shows pointer cursor on hover). |

## MapClusterLayer

Renders clustered point data using MapLibre GL's native clustering. Automatically groups nearby points into clusters that expand on click. Must be used inside `Map`. Supports a generic type parameter for typed feature properties:`MapClusterLayer<MyProperties>`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `string | GeoJSON.FeatureCollection` | `—` | GeoJSON FeatureCollection data or URL to fetch GeoJSON from. |
| `clusterMaxZoom` | `number` | `14` | Maximum zoom level to cluster points on. |
| `clusterRadius` | `number` | `50` | Radius of each cluster when clustering points (in pixels). |
| `clusterColors` | `[string, string, string]` | `["#22c55e", "#eab308", "#ef4444"]` | Colors for cluster circles: \[small, medium, large\] based on point count. |
| `clusterThresholds` | `[number, number]` | `[100, 750]` | Point count thresholds for color/size steps: \[medium, large\]. |
| `pointColor` | `string` | `"#3b82f6"` | Color for unclustered individual points. |
| `onPointClick` | `(feature: GeoJSON.Feature, coordinates: [number, number]) => void` | `—` | Callback when an unclustered point is clicked. |
| `onClusterClick` | `(clusterId: number, coordinates: [number, number], pointCount: number) => void` | `—` | Callback when a cluster is clicked. If not provided, zooms into the cluster. |

[Installation](https://www.mapcn.dev/docs/installation) [Map](https://www.mapcn.dev/docs/basic-map)

On This Page

[Component Anatomy](https://www.mapcn.dev/docs/api-reference#component-anatomy) [Map](https://www.mapcn.dev/docs/api-reference#map) [useMap](https://www.mapcn.dev/docs/api-reference#usemap) [MapControls](https://www.mapcn.dev/docs/api-reference#mapcontrols) [MapMarker](https://www.mapcn.dev/docs/api-reference#mapmarker) [MarkerContent](https://www.mapcn.dev/docs/api-reference#markercontent) [MarkerPopup](https://www.mapcn.dev/docs/api-reference#markerpopup) [MarkerTooltip](https://www.mapcn.dev/docs/api-reference#markertooltip) [MarkerLabel](https://www.mapcn.dev/docs/api-reference#markerlabel) [MapPopup](https://www.mapcn.dev/docs/api-reference#mappopup) [MapRoute](https://www.mapcn.dev/docs/api-reference#maproute) [MapClusterLayer](https://www.mapcn.dev/docs/api-reference#mapclusterlayer)