import Usuario from '../models/Usuario.js';

export const verificarExistencia = async(req, res, next)=>{
    const { usuario, correo, contrasena } = req.body;
    if(!usuario || !correo || !contrasena){
        return res.status(400).json("!Se requieren todos los datos!");
    }
    const usuarioExist = await Usuario.findOne({usuario: usuario})
    if(usuarioExist){
        return res.status(400).json("!Usuario ya Existente!");
    }

    const correoExist = await Usuario.findOne({correo: correo})
    if(correoExist){
        return res.status(400).json("!Correo ya Existente!");
    }

    next();
}