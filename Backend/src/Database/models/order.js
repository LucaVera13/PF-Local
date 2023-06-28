const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  customerId: { type: String },

  orderItems: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      quantity: {
        type: String,
      },
      images: {
        type: [String],
      },
      price: {
        type: Number,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    amountPaid: {
      type: Number,
    },
  },
  orderStatus: {
    type: String,
    default: "En proceso",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
