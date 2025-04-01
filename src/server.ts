import express from "express"
import { PrismaClient } from "@prisma/client"

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/info", async (_, res) => {
  const informacoes = await prisma.informacao.findMany();
  res.json(informacoes);
});


app.post("/info", async (req, res) => {

  const {title , description } = req.body;

  try {
    await prisma.informacao.create({
      data: {
        title: title,
        description: description,
      }
    });
  }catch(error) {
    console.log(error);
    res.status(500).send({message: "Falha ao cadastar uma informação"});
  }
  res.status(201).send();
})

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
})