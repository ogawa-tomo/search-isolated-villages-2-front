# search-isolated-villages-2-front

![image](https://github.com/user-attachments/assets/7cacf018-05d8-482b-b332-2a04102d5566)

## 概要

[秘境集落探索ツール](https://search-isolated-villages.com/)のフロントエンドです。

秘境集落や秘境施設を人口分布データに基づいた指標により地域ごとにランキングで出力し、それぞれの集落・施設を地図上で閲覧することができます。

[旧サービス](https://search-isolated-villages-2.herokuapp.com/)を以前より公開していましたが、そのフロントエンドを置き換えるプロジェクトです。旧サービスはそのままバックエンドサーバとして利用しています。

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
NEXT_PUBLIC_VILLAGE_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_MAP_TILER_API_KEY=your_map_tiler_api_key
```

### 立ち上げ

バックエンドサーバのリポジトリをcloneして立ち上げておく（[リポジトリ](https://github.com/ogawa-tomo/search-isolated-villages-2)のREADMEを参照）

セットアップ

```
$ npm install
```

フロントエンドサーバを立ち上げる

```
$ npm run dev
```

http://localhost:3000 にアクセス

### 集落の取得に失敗したとき

以下のコマンドでWSLから見たWindowsのIPを取得

```
$ ip route | grep 'default via' | grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'
```

それを.env.localに設定

```
NEXT_PUBLIC_VILLAGE_API_URL=http://172.29.128.1:5000

```

## コンポーネントテスト

```
$ npm run test
```

## E2E テスト

テスト環境で立ち上げる

```
$ npm run dev:test
```

バックエンドのモックサーバーを立ち上げる

```
$ docker-compose up -d
```

テスト実行

```
$ npx playwright test
```
