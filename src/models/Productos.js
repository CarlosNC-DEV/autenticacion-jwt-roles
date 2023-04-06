import { Schema, model } from 'mongoose';

const productosSchema = new Schema(
    {
        nombre: {
            type: String
        },
        precio:{
            type: Number
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Productos", productosSchema);