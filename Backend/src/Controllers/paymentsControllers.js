const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51NNLpXJ1lb1YFkHpt7cNexUW59vJoBx40Sta98qZ2Bqa8bRzrTaU1gjsNAWMrpYseNMP4u3KRJZxMbjBXT9LtuJC00e9OgY4Hm"
);
const User = require("../Database/models/userModel");
const DOMAIN = "https://re-store-six.vercel.app/";

// const endpointSecret =
//   "whsec_602cd2598b4998749e3f929be11b474b1123a11e8d6a5c3bea2a9be9e5728679";
const retrieveCartData = async (userId) => {
  try {
    // Buscar al usuario en la base de datos utilizando el userId
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Devolver los datos del carrito del usuario
    return user.carrito;
  } catch (error) {
    console.error("Error al recuperar los datos del carrito:", error);
    throw error;
  }
};

const createSession = async (req, res) => {
  // Obtener el identificador o referencia del carrito desde req.body.cartId
  const userId = req.body.userId;

  // Recuperar los datos completos del carrito utilizando el identificador o referencia
  const cartData = await retrieveCartData(userId);

  try {
    const lineItems = cartData.map((product) => {
      const { name, description, unit_amount, quantity, images } = product;

      return {
        price_data: {
          product_data: {
            name: name,
            description: description,
            images: images,
          },
          currency: "USD",
          unit_amount: unit_amount,
        },
        quantity: quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${DOMAIN}?success=true`,
      cancel_url: `${DOMAIN}?canceled=true`,
      customer: customer.id,
    });

    const paymentUrl = session.url;
    console.log(paymentUrl);
    res.json({ url: paymentUrl });
  } catch (error) {
    console.error("Error al crear la sesión de pago:", error);
    res.status(500).send("Error al crear la sesión de pago");
  }
};

module.exports = { createSession };
