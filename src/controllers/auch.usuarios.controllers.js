import Usuario from '../models/Usuario.js';
import Roles from '../models/Roles.js';
import { JWT_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async(req, res)=>{
    try {
        const { contrasena, rol } = req.body;

        const usuarioModel = new Usuario(req.body);
        usuarioModel.password = await usuarioModel.hashePassword(contrasena);

        if(rol){
            const rolFound = await Roles.find({ nombre: {$in: rol}});
            usuarioModel.rol = rolFound.map((rol)=> rol._id);
        }else{
            const rolUser = await Roles.findOne({nombre: 'usuario'});
            usuarioModel.rol = [rolUser._id]
        }

        const usuarioSave = await usuarioModel.save();

        const token = jwt.sign({ id: usuarioSave._id }, JWT_SECRET , {expiresIn: 86400});

        res.status(200).json({
            token: token,
            messagge: "!Usuario Creado Correctamente!"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json("!Error en el servidor!");
    }
}

export const iniciarUsuario = async(req, res)=>{
    try {
        const { correo, contrasena }= req.body;
        if(!correo || !contrasena){
            return res.status(400).json("!Se requieren todos los datos!");
        }
        const usuarioFound = await Usuario.findOne({ correo: correo }).populate("rol");
        if(!usuarioFound){
            return res.status(400).json("!Correo Incorrecto!");
        }

        const validatePass = await Usuario.validatePassword(contrasena, usuarioFound.password);
        if(!validatePass){
            return res.status(400).json("!Contraseña Incorrecta!");
        }

        const token = jwt.sign({ id: usuarioFound._id }, JWT_SECRET , {expiresIn: 86400});

        res.status(200).json({
            token: token,
            messagge: "!Login Correcto!"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json("!Error en el servidor!");
    }
}