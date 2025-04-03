"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const port = 3000;
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
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
    }
    catch (error) {
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
    }
    catch (error) {
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
    }
    catch (error) {
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
