import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import productos from './routes/productos.routes.js';
import auchUsers from './routes/auch.usuarios.routes.js';
import { createRoles } from './libs/rolesSetup.js';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createRoles();

app.use("/productos",productos);
app.use(auchUsers);

export default app;