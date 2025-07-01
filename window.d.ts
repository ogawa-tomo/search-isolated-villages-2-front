export declare global {
  interface Window {
    // maplibre-google-streetviewがnpm経由でインストールできないため、CDN経由で読み込むために設定している
    // https://github.com/rezw4n/maplibre-google-streetview/issues/1
    MaplibreGoogleStreetView: any;
  }
}
