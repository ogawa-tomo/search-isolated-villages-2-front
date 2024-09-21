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

## コンポーネントテスト

```
$ npm run test
```


## E2E テスト

テスト環境で立ち上げる

```
$ NODE_ENV=test npm run dev
```

バックエンドのモックサーバーを立ち上げる

```
$ docker-compose up -d
```

テスト実行

```
$ npx playwright test
```
