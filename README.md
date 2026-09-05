<div align="center">

# NatureQuest

音声ガイドを頼りに、耳で自然を探索するリラックスアプリ

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt&logoColor=white)](https://nuxt.com/)
[![Vuetify 3](https://img.shields.io/badge/Vuetify-3-1867C0?logo=vuetify&logoColor=white)](https://vuetifyjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<img src="public/images/banner.png" alt="NatureQuest バナー" width="100%">

</div>

> [!NOTE]
> このプロジェクトは開発を終了しており、現在はメンテナンスされていません。

## 概要

NatureQuest は、スマートフォンの位置情報と音声ガイドを組み合わせた探索型のリラックスアプリです。画面を凝視するのではなく、「近づきました」「遠くなりました」という音声の案内を頼りに散歩しながら、鳥のいる目的地を探し当てる体験を提供します。自然音に包まれて心が落ち着く時間を、もっと日常に取り入れたい人のために作りました。

## 特徴

- **サウンド・トレジャーハント** — 「TAP TO START」で探索を開始。GPS で取得した現在地と目的地との距離を Haversine 公式で算出し、画面上に m 単位で表示する
- **音声によるナビゲーション** — 距離が 5 の倍数になったタイミングで前回との増減を判定し、「近づきました」「遠くなりました」の音声とメッセージで知らせる
- **鳥を見つけるとゴール** — 目的地から 10 m 以内に入ると獲得音声が再生され、探索が終了する
- **リザルト表示** — 歩いた総距離と経過時間をダイアログで振り返れる
- **レーダー演出** — CSS アニメーションによる回転スキャナーと波紋で、探索中の雰囲気を演出する
- **重ね再生できるオーディオ** — Web Audio API を薄くラップした `audio.ts` により、開始音とメジロのさえずりのように複数の音を同時に鳴らせる

## 技術スタック

| 領域 | 技術 |
| --- | --- |
| フレームワーク | Nuxt 3（SPA モード、`ssr: false`）/ Vue 3 |
| UI | Vuetify 3 / Material Design Icons（`@mdi/font`） |
| 言語 | TypeScript |
| スタイル | Sass（SCSS）/ `@nuxtjs/google-fonts`（Roboto、Noto Sans JP） |
| 音声 | Web Audio API（`AudioContext`） |
| 位置情報 | Geolocation API（`watchPosition`、高精度モード） |

## セットアップ

### 前提

- Node.js 20.9.0（`.node-version`）
- npm

### コマンド

```bash
npm install
npm run dev        # 開発サーバー（http://localhost:3000）
npm run build      # 本番ビルド
npm run generate   # 静的サイト生成
npm run preview    # ビルド結果のプレビュー
```

### 動作確認のポイント

- 位置情報 API を使うため、スマートフォン実機での確認を推奨します。ブラウザの仕様上、`localhost` 以外では HTTPS 配信が必要です
- 目的地の座標は `pages/index.vue` の `targetData` に直接記述されています。別の場所で遊ぶ場合はここを書き換えてください
- `nuxt.config.ts` には Firebase 用の環境変数（`FIREBASE_API_KEY` など 6 つ）が定義されていますが、現在の画面からは参照されていないため、未設定でも起動できます

## 構成

```text
.
├── audio.ts                 # Web Audio API ラッパー（重ね再生・一括停止）
├── pages/
│   ├── index.vue            # 探索画面（メイン）
│   └── iu.vue               # 目的地座標と開始音声を差し替えた別会場向けページ
├── components/
│   ├── SplashScreen.vue     # 起動画面（TAP TO START）
│   └── AppDialog.vue        # リザルトダイアログ
├── assets/style/            # SCSS 変数・共通スタイル・アニメーション
├── plugins/                 # Vuetify 設定・ページ遷移ヘルパー
├── public/audio/            # さえずり・効果音・ナレーション（mp3）
├── public/images/           # バナー・スプラッシュ画像
└── server/lib/firestore.ts  # Firebase 初期化（未使用）
```
