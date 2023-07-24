import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import patientsRouter from './routes/patients';
import appointmentsRouter from './routes/appointments';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/pacientes', patientsRouter);
app.use('/agendamentos', appointmentsRouter);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));