const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51NNLpXJ1lb1YFkHpt7cNexUW59vJoBx40Sta98qZ2Bqa8bRzrTaU1gjsNAWMrpYseNMP4u3KRJZxMbjBXT9LtuJC00e9OgY4Hm"
);
const DOMAIN = "https://re-store-six.vercel.app/";

const endpointSecret =
  "whsec_602cd2598b4998749e3f929be11b474b1123a11e8d6a5c3bea2a9be9e5728679";

const createSession = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      carrito: JSON.stringify(req.body.cartItems),
    },
  });

  try {
    const lineItems = req.body.cartItems.map((product) => {
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
    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error al crear la sesión de pago:", error);
    res.status(500).send("Error al crear la sesión de pago");
  }
};

const webHookController = async (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const line_items = await stripe.checkout.session.listLineItems(
        session.id
      );
      console.log(line_items);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createSession, webHookController };
