const express = require("express");
const router = express.Router();
const categoryTechnology = require("./tecnologia");
const userRouter = require("./userRouter");
const carritoRouter = require("./carrito");
const rutaPagos = require("./rutaPagos");

router.use("/categories/technology", categoryTechnology);
router.use("/users", userRouter);
router.use("/carrito", carritoRouter);
router.use("/payments", rutaPagos);

module.exports = router;
