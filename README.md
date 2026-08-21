# search-isolated-villages-2-front

![image](https://github.com/user-attachments/assets/7cacf018-05d8-482b-b332-2a04102d5566)

## 概要

[秘境集落探索ツール](https://search-isolated-villages.vercel.app/)のソースコードです。

秘境集落や秘境施設を人口分布データに基づいた指標により地域ごとにランキングで出力し、それぞれの集落・施設を地図上で閲覧することができます。

[旧サービス](https://search-isolated-villages-2.herokuapp.com/)を以前より公開していましたが、そのフロントエンドを置き換えるプロジェクトとして作成しました。旧サービスは常時稼働のバックエンドサーバとして運用していましたが、現在は廃止し、検索対象データをこのリポジトリにJSONとしてコミットして持つ構成に変更しています（[search-isolated-villages-2](https://github.com/ogawa-tomo/search-isolated-villages-2)リポジトリは、そのJSONの元となるCSVを生成するバッチ処理としてのみ残しています）。

## 主な技術スタック

- Next.js 14.2.5
- TypeScript 5.1.6
- tailwindcss 3.3.3
- daisyUI 3.7.7
- jest 29.7.0
- Playwright 1.41.1

## ローカル環境での動作確認

### Google Maps APIキーの取得

[MapLibre Google Street View](https://github.com/rezw4n/maplibre-google-streetview)を用いているため、下記の権限を持つGoogle Maps APIキーを用意する。

- Street View Static API
- Maps Embed API

### MapTiler APIキーの取得

[MapTiler](https://www.maptiler.com/)のアカウントを作成し、APIキーを用意する。

### 環境変数の設定

プロジェクト直下に`.env.local`ファイルを作成し、以下のように記述する

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_MAP_TILER_API_KEY=your_map_tiler_api_key
```

### 立ち上げ

セットアップ

```
npm install
```

フロントエンドサーバを立ち上げる

```
npm run dev
```

<http://localhost:3000> にアクセス

### 集落・施設データの同期

バックエンドリポジトリ（[search-isolated-villages-2](https://github.com/ogawa-tomo/search-isolated-villages-2)）でCSVを再生成した際は、`src/data`配下のJSONを更新する。

`.env.local`にバックエンドリポジトリの`input_data`ディレクトリを指定する。

```
BACKEND_INPUT_DATA_DIR=/path/to/search-isolated-villages-2/input_data
```

以下のコマンドで同期する。

```
npm run sync-data
```

## コンポーネントテスト

```
npm run test
```

## E2E テスト

```
npx playwright test
```

本番ビルド（`npm run build && npm run start`）を自動で立ち上げてテストするため、事前準備は不要。
