import express from 'express';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ROTAS DA PAGINA DE INFORMACOES
// Buscar Informação
app.get('/info', async (_, res) => {
  const informacoes = await prisma.informacao.findMany();
  res.json(informacoes);
});

// Criar Informação
app.post('/info', async (req, res) => {
  const { title, description } = req.body;

  try {
    await prisma.informacao.create({
      data: {
        title: title,
        description: description,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Falha ao cadastar uma informação.' });
  }
  res.status(201).send();
});

// Atualizar Informação
app.put('/info/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const info = await prisma.informacao.findUnique({
      where: {
        id,
      },
    });

    if (!info) {
      return res.status(404).send({ message: 'Informação não encontrada.' });
    }

    const data = { ...req.body };
    await prisma.informacao.update({
      where: {
        id: id,
      },
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Falha ao atualizar o registro.' });
  }
  res.status(200).send();
});

// Deletar Informação
app.delete('/info/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const info = await prisma.informacao.findUnique({ where: { id } });

    if (!info) {
      return res
        .status(404)
        .send({ message: 'A informação não foi encontrada.' });
    }

    await prisma.informacao.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: 'Não foi possível remover a informação.' });
  }
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
