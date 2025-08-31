// TODO: what is it ?
declare global {
  interface Window {
    mapRef: React.RefObject<maplibregl.Map | null>;
    markerRef: React.RefObject<maplibregl.Marker | null>;
  }
}
