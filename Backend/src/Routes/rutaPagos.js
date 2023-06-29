const express = require("express");
const router = express.Router();
const { createSession } = require("../Controllers/paymentsControllers");
const Stripe = require("stripe");
const User = require("../Database/models/userModel");
const Earnings = require("../Database/models/totalEarnings");
const stripe = new Stripe(
  "sk_test_51NNLpXJ1lb1YFkHpt7cNexUW59vJoBx40Sta98qZ2Bqa8bRzrTaU1gjsNAWMrpYseNMP4u3KRJZxMbjBXT9LtuJC00e9OgY4Hm"
);
let endpointSecret;

// Parsear el cuerpo de la solicitud como texto sin procesar

router.post("/create-checkout-session", createSession);
router.get("/success");
router.get("/cancel");
router.get("/earnings", async (req, res) => {
  try {
    const earnings = await Earnings.findOne({});
    res.json({ earnings: earnings ? earnings.earnings : 0 });
  } catch (error) {
    console.error("Error retrieving total earnings:", error);
    res.status(500).json({ error: "Error retrieving total earnings" });
  }
});

// endpointSecret =
//   "whsec_602cd2598b4998749e3f929be11b474b1123a11e8d6a5c3bea2a9be9e5728679";
const createOrder = async (customer, data) => {
  try {
    console.log("Creating new order...");
    console.log(customer.metadata.userId);
    const user = await User.findById(customer.metadata.userId);
    const cartData = user.carrito;

    console.log("Cart Data:", cartData);

    const orderItems = cartData.map((item) => ({
      id: item.productId,
      quantity: item.cantidad,
      price: item.precio,
    }));

    const newOrder = {
      user: customer.metadata.userId,
      customerId: data.customer,
      orderItems: orderItems,
      paymentInfo: {
        id: data.payment_intent,
        status: data.payment_status,
        amountPaid: data.amount_total,
      },
    };

    console.log("New Order:", newOrder);

    // Update user's orders property
    const updatedUser = await User.findByIdAndUpdate(
      customer.metadata.userId,
      {
        $push: { orders: newOrder },
      },
      { new: true }
    );

    console.log("Updated User:", updatedUser);

    const earnings = await Earnings.findOne({});
    if (earnings) {
      earnings.earnings += data.amount_total;
      await earnings.save();
    } else {
      await Earnings.create({ earnings: data.amount_total });
    }

    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
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
