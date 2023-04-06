import { Router } from 'express';

import { registrarUsuario, iniciarUsuario } from '../controllers/auch.usuarios.controllers.js';
import { verificarExistencia } from '../middlewares/auchUsuarios.js';
const router = Router();

router.post("/registrarme", verificarExistencia, registrarUsuario);
router.post("/iniciar", iniciarUsuario);

export default router;