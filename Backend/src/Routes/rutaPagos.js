const express = require("express");
const router = express.Router();
const {
  createSession,
  //   webHookController,
} = require("../Controllers/paymentsControllers");
const Stripe = require("stripe");
const Order = require("../Database/models/order");
const stripe = new Stripe(
  "sk_test_51NNLpXJ1lb1YFkHpt7cNexUW59vJoBx40Sta98qZ2Bqa8bRzrTaU1gjsNAWMrpYseNMP4u3KRJZxMbjBXT9LtuJC00e9OgY4Hm"
);
let endpointSecret;

// Parsear el cuerpo de la solicitud como texto sin procesar

router.post("/create-checkout-session", createSession);
router.get("/success");
router.get("/cancel");

// endpointSecret =
//   "whsec_602cd2598b4998749e3f929be11b474b1123a11e8d6a5c3bea2a9be9e5728679";
const createOrder = async (customer, data) => {
  try {
    console.log("Creating new order...");

    const cartData = JSON.parse(customer.metadata.carrito);
    console.log("Cart Data:", cartData);

    const newOrder = new Order({
      user: customer.metadata.userId,
      customerId: data.customer,
      orderItems: cartData.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        images: item.images,
        price: item.price,
      })),
      paymentInfo: {
        id: data.payment_intent,
        status: data.payment_status,
        amountPaid: data.amount_total,
      },
    });

    console.log("New Order:", newOrder);

    const createdOrder = await newOrder.save();

    console.log("Order created:", createdOrder);
    // Realiza cualquier otra acción necesaria

    return createdOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    // Maneja el error de acuerdo a tus necesidades
    throw error;
  }
};

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("webhook verify");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
        })
        .catch((err) => console.log(err.message));
    }
    res.send().end();
  }
);

module.exports = router;
