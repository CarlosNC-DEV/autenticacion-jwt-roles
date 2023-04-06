import Productos from "../models/Productos.js";

export const verProductos = async (req, res) => {
  try {
    const productos = await Productos.find().lean();
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    return res.status(500).json("!Error en el servidor!");
  }
};

export const crearProducto = async (req, res) => {
  try {
    const productosModel = new Productos(req.body);
    await productosModel.save();

    res.status(200).json("!Producto Creado!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("!Error en el servidor!");
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Productos.findByIdAndUpdate(id, req.body);
    res.status(200).json("!Producto Actualizado!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("!Error en el servidor!");
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Productos.findByIdAndDelete(id);
    res.status(200).json("!Producto Eliminado!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("!Error en el servidor!");
  }
};
