import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + Express Server");
});

app.listen(port, () => {
  console.log(`서버 가동 중... 포트번호: ${port}`);
});
