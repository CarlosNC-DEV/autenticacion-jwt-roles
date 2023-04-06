import { Router } from 'express';
import { verificarToken, esModerador, esAdministrador } from '../middlewares/verificarToken.js';
import { verProductos, crearProducto, actualizarProducto, eliminarProducto} from '../controllers/productos.controllers.js';

const router = Router();

router.get("/", verProductos);
router.post("/", [ verificarToken, esModerador ], crearProducto);
router.put("/:id", [ verificarToken, esModerador ], actualizarProducto);
router.delete("/:id", [ verificarToken, esAdministrador ], eliminarProducto);

export default router;