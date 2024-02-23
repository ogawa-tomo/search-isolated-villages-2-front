# search-isolated-villages-2-front

[秘境集落探索ツール](https://search-isolated-villages-2.herokuapp.com/)のフロントエンドを置き換えるプロジェクトです。

現サービスのリポジトリはこちら
https://github.com/ogawa-tomo/search-isolated-villages-2

## ローカル環境での動作確認

このディレクトリと並列の位置に秘境集落探索ツールのバックエンドサーバーのリポジトリを clone する

```
$ cd ..
$ git clone https://github.com/ogawa-tomo/search-isolated-villages-2.git
```

秘境集落探索ツールのバックエンドサーバーを立ち上げる（秘境集落探索ツールのバックエンドサーバーのリポジトリの README を参照）

立ち上げる

```
$ npm run dev
```

http://localhost:3000 にアクセス

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
