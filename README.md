# search-isolated-villages-2-front

[秘境集落探索ツール](https://search-isolated-villages-2.herokuapp.com/)のフロントエンドを置き換えるプロジェクトです。

現サービスのリポジトリは[こちら](https://github.com/ogawa-tomo/search-isolated-villages-2)

## ローカル環境での動作確認

バックエンドサーバのリポジトリをcloneして立ち上げておく（[リポジトリ](https://github.com/ogawa-tomo/search-isolated-villages-2)のREADMEを参照）

フロントエンドサーバを立ち上げる

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
