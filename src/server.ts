import express from "express"
import { PrismaClient } from "@prisma/client"

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.get("/info", async (req, res) => {
  const informacoes = await prisma.informacoes.findMany();
  res.json(informacoes);
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
})