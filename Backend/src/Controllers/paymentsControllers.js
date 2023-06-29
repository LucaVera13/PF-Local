const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51NNLpXJ1lb1YFkHpt7cNexUW59vJoBx40Sta98qZ2Bqa8bRzrTaU1gjsNAWMrpYseNMP4u3KRJZxMbjBXT9LtuJC00e9OgY4Hm"
);
const DOMAIN = "https://re-store-six.vercel.app/";

// const endpointSecret =
//   "whsec_602cd2598b4998749e3f929be11b474b1123a11e8d6a5c3bea2a9be9e5728679";

const createSession = async (req, res) => {
  const { userId, cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems)) {
    console.error("Error: Invalid cartItems format");
    res.status(400).send("Error: Invalid cartItems format");
    return;
  }

  const customer = await stripe.customers.create({
    metadata: {
      userId: userId,
      carrito: JSON.stringify(cartItems),
    },
  });

  try {
    const lineItems = cartItems.map((product) => {
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
