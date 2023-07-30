import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';
import bodyParser from 'body-parser';
import "reflect-metadata"
import { AppDataSource } from './database';
import rootRouter from './routes';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CareManager API',
            version: '1.0.0',
            description: 'A simple Express API for simulating an EHR system. It contains endpoints for managing users, patients, appointments and health records.',
            servers: ['http://localhost:8080'],
        },
    },
    apis: ['src/routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

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
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Resposta padrão para quaisquer outras requisições:
    app.use((req, res) => {
        res.status(404)
        res.send({ error: 'Endpoint não encontrado' })
    });

    app.listen(PORT, () => console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`));

}).catch(err => console.log(err))