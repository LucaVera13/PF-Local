const TechSchema = require("../Database/models/Technology");

// Agregar usuario al carrito
const addToCartHandler = async (req, res) => {
  try {
    const userId = req.cookies.User_id;
    const { productId } = req.body;

    await TechSchema.findByIdAndUpdate(productId, {
      $push: { carrito: userId },
    });

    res.status(200).json({ message: "Producto agregado al carrito con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
};

// Eliminar usuario del carrito
const removeFromCartHandler = async (req, res) => {
  try {
    const userId = req.cookies.User_id;
    const { productId } = req.body;

    // Eliminar el ID del producto del array 'carrito' del usuario
    await TechSchema.findByIdAndUpdate(productId, {
      $pull: { carrito: userId },
    });

    res
      .status(200)
      .json({ message: "Producto eliminado del carrito con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el producto del carrito" });
  }
};

const getCartProductsHandler = async (req, res) => {
  try {
    const userId = req.cookies.User_id;

    // Obtener todos los productos donde el array 'carrito' contenga el ID del usuario
    const products = await TechSchema.find({ carrito: userId });

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los productos del carrito" });
  }
};

module.exports = {
  addToCartHandler,
  removeFromCartHandler,
  getCartProductsHandler,
};
