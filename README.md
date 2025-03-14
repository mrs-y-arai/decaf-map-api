# アプリケーションアーキテクチャ

このプロジェクトは、クリーンアーキテクチャの原則に基づいて設計されています。各層の責務を明確に分離し、保守性と拡張性の高いコードベースを実現しています。

## ディレクトリ構造

src/
L controllers/ # HTTP リクエストの制御とレスポンスの整形

L services/ # ビジネスロジックの実装

L L useCase/ # ユースケース単位でのビジネスロジック

L repositories/ # データアクセス層

L models/ # ドメインモデル

L schema/ # データスキーマ定義

L middleware/ # HTTP ミドルウェア

L routes/ # ルーティング定義

L infrastructure/ # インフラストラクチャ層（DB、外部 API 連携など）

L constants/ # 定数定義

L utils/ # ユーティリティ関数

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

## テスト

Docker 環境でテスト用のコンテナを起動してテストを実行します。

### テスト用のコンテナを起動(まだなければコンテナ作成される)

```bash
make test-services-up
```

### テストデータベース マイグレーション

```bash
npm run test:db-migrate
```

### テストの実行

```bash
npm run test
```

### コンテナを作り直したい場合

```bash
make test-services-rebuild
```

