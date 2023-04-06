import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const usuariosSchema = new Schema(
    {
        usuario: {
            type: String,
            unique: true,
            require: true
        },
        correo:{
            type: String,
            unique: true,
            require: true
        },
        password:{
            type: String,
            require: true
        },
        rol:[{
            ref: 'Roles',
            type: Schema.Types.ObjectId
        }]
    },
    {
        versionKey: false
    }
)

usuariosSchema.methods.hashePassword = async(contrasena)=>{
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(contrasena, salt);
}

usuariosSchema.statics.validatePassword = async(contrasena, password)=>{
    return await bcryptjs.compare(contrasena, password);
}

export default model("Usuarios", usuariosSchema);