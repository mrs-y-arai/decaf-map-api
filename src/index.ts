import express, { Request, Response } from "express";
import { add } from "./calc";
const app = express();
const port = 3000;

// APIのエンドポイント
app.get("/", (req: Request, res: Response) => {
  const result = add(1, 2);
  res.send(`Result: ${result}`);
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
