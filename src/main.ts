import express, { Request, Response } from "express";
const app = express();
const port = 3000;

// APIのエンドポイント
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
