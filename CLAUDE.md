# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code)へのガイダンスを提供します。

## プロジェクト概要

Next.jsで構築された秘境集落探索ツールのフロントエンドです。人口分布データに基づいて日本の秘境集落や施設を検索・探索し、インタラクティブマップ上でランキング機能付きで結果を表示するアプリケーションです。

## 開発コマンド

### セットアップと開発
- `npm install` - 依存関係をインストール
- `npm run dev` - 開発サーバーを http://localhost:3000 で起動
- `npm run dev:test` - テストモードで開発サーバーを起動
- `npm run dev:https` - HTTPSで開発サーバーを起動

### ビルドと本番環境
- `npm run build` - 本番用にアプリケーションをビルド
- `npm run start` - 本番サーバーを起動
- `npm run typecheck` - TypeScriptの型チェックを実行

### コード品質
- `npm run lint` - ESLintを実行
- `npm run lint:fix` - ESLintを自動修正付きで実行
- `npm run format` - Prettierでコードをフォーマット

### テスト
- `npm run test` - Jestでユニット/コンポーネントテストを実行（`**/__tests__/**/*.test.tsx`にマッチ）
- `npx playwright test` - PlaywrightでE2Eテストを実行（`**/*.spec.ts`にマッチ）

E2Eテストを実行するには：
1. テスト環境を開始: `npm run dev:test`
2. モックバックエンドを開始: `docker-compose up -d` (WireMockサーバー)
3. テストを実行: `npx playwright test`

## アーキテクチャ概要

### コア構造
- **App Router**: TypeScript付きのNext.js 14 App Routerを使用
- **状態管理**: ローカル状態にReact hooks、グローバル状態管理ライブラリは不使用
- **スタイリング**: daisyUIコンポーネント付きのTailwind CSS
- **マップ**: カスタムマーカーとポップアップ付きのMapLibre GL JS
- **API統合**: バックエンド通信にサーバーアクションを使用

### 主要ディレクトリ
- `src/app/` - Next.js App Routerのページとレイアウト
- `src/components/` - 再利用可能なUIコンポーネント
- `src/lib/` - ユーティリティ関数とAPI呼び出し
- `src/types/` - TypeScript型定義
- `src/mocks/` - テストモックとフィクスチャ

### データフロー
1. ユーザーがモーダル（`VillageSearchModal`または`FacultySearchModal`）で検索
2. 検索パラメータがサーバーアクション（`fetchVillages`または`fetchFaculties`）に渡される
3. 結果が`PointView`コンポーネントでマップとリストに表示される
4. マップコンポーネント（`BaseMap`）がMapLibre GL JSでポイントをレンダリング

### 主要な型
- `Village` - 人口と座標を含む秘境集落データ
- `Faculty` - 座標を含む施設データ（駅、学校など）
- `VillageSearchParams`/`FacultySearchParams` - 検索フィルターパラメータ
- 両方のポイント型は共通の地理的フィールドを共有し、型固有のプロパティで拡張

### 外部依存関係
- **バックエンドAPI**: 別途バックエンドサーバーが必要（セットアップはREADMEを参照）
- **Google Maps API**: ストリートビュー統合に必要
- **MapTiler API**: マップタイルに必要
- **WireMock**: E2Eテストのモックに使用

### 環境設定
`.env.local`に必要な環境変数：
```
NEXT_PUBLIC_VILLAGE_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_MAP_TILER_API_KEY=your_map_tiler_api_key
```

### テスト戦略
- **Jest**: `__tests__/`ディレクトリ内のコンポーネントとユーティリティ関数のテスト
- **Playwright**: WireMockを使用したバックエンドモックによるE2Eテスト
- **テスト環境**: `NODE_ENV=test`による独立したテストモード