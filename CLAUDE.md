# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code)へのガイダンスを提供します。

## プロジェクト概要

Next.jsで構築された秘境集落探索ツールのフロントエンドです。人口分布データに基づいて日本の秘境集落や施設を検索・探索し、インタラクティブマップ上でランキング機能付きで結果を表示するアプリケーションです。

## 開発コマンド

### セットアップと開発
- `npm install` - 依存関係をインストール
- `npm run dev` - 開発サーバーを http://localhost:3000 で起動
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

`npx playwright test`実行時、Playwrightが自動で本番ビルド（`npm run build && npm run start`）を立ち上げてテストするため、事前準備は不要。

## アーキテクチャ概要

### コア構造
- **App Router**: TypeScript付きのNext.js 14 App Routerを使用
- **状態管理**: ローカル状態にReact hooks、グローバル状態管理ライブラリは不使用
- **スタイリング**: daisyUIコンポーネント付きのTailwind CSS
- **マップ**: カスタムマーカーとポップアップ付きのMapLibre GL JS
- **データ・検索処理**: 外部バックエンドを持たず、リポジトリにコミットされたJSONデータをサーバーアクションが直接読み込んでフィルタ処理する

### 主要ディレクトリ
- `src/app/` - Next.js App Routerのページとレイアウト
- `src/components/` - 再利用可能なUIコンポーネント
- `src/lib/` - ユーティリティ関数、フィルタロジック（`src/lib/filters/`）、サーバーアクション（`fetchVillages`など）
- `src/types/` - TypeScript型定義
- `src/data/` - 検索対象の集落・施設データ（JSON、コミット済み）。`scripts/sync-data.ts`で元となるバックエンドリポジトリのCSVから生成する

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
- **Google Maps API**: ストリートビュー統合に必要
- **MapTiler API**: マップタイルに必要

### 環境設定
`.env.local`に必要な環境変数：
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_MAP_TILER_API_KEY=your_map_tiler_api_key
```

集落・施設データを同期する場合（`npm run sync-data`）は、加えてバックエンドリポジトリの`input_data`ディレクトリを指定する`BACKEND_INPUT_DATA_DIR`が必要。

### テスト戦略
- **Jest**: `__tests__/`ディレクトリ内のコンポーネントとユーティリティ関数のテスト。取得失敗・該当なしなど、実データに依存させたくないケースはここでサーバーアクションを`jest.mock`してテストする
- **Playwright**: コミット済みの実データに対して、代表的なハッピーパス（検索→結果表示→ページネーション）のみを検証するE2Eテスト