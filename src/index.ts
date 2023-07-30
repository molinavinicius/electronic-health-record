import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata"
import { AppDataSource } from './database';
import rootRouter from './routes';

AppDataSource.initialize().then(async () => {
    const app = express();

    // Porta do servidor
    const PORT = process.env.PORT || 8080
    // Host do servidor
    const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

    app.use(cors());
    app.use(bodyParser.json());
    // // JSON
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/', rootRouter);

    // Resposta padrão para quaisquer outras requisições:
    app.use((req, res) => {
        res.status(404)
        res.send({ error: 'Endpoint não encontrado' })
    });

    app.listen(PORT, () => console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`));

}).catch(err => console.log(err))