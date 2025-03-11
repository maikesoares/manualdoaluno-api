import express from "express"

const port = 3000;
const app = express();

app.get("/content", (req, res) => {
  res.send("Listagem dos Conteúdos");
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
})