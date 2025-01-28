# アプリケーションアーキテクチャ

このプロジェクトは、クリーンアーキテクチャの原則に基づいて設計されています。各層の責務を明確に分離し、保守性と拡張性の高いコードベースを実現しています。

## ディレクトリ構造

src/
├── controllers/ # HTTP リクエストの制御とレスポンスの整形
├── services/ # ビジネスロジックの実装
│ └── useCase/ # ユースケース単位でのビジネスロジック
├── repositories/ # データアクセス層
├── models/ # ドメインモデル
├── schema/ # データスキーマ定義
├── middleware/ # HTTP ミドルウェア
├── routes/ # ルーティング定義
├── infrastructure/ # インフラストラクチャ層（DB、外部 API 連携など）
├── constants/ # 定数定義
└── utils/ # ユーティリティ関数

## レイヤー構成

### Presentation Layer (Controllers, Routes)

- HTTP リクエストのハンドリング
- 入力バリデーション
- レスポンスの整形
- ルーティングの定義

### Business Layer (Services, UseCase)

- ビジネスロジックの実装

### Data Layer (Repositories, Models)

- データアクセスロジック
- ドメインモデルの定義
- データの永続化

### Infrastructure Layer

- データベース接続
- 外部 API クライアント
