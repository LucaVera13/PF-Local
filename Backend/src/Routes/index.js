const express = require("express");
const router = express.Router();
const categoryTechnology = require("./tecnologia");
const userRouter = require("./userRouter");
const carritoRouter = require("./carrito");

router.use("/categories/technology", categoryTechnology);
router.use("/users", userRouter);
router.use("/carrito", carritoRouter);

module.exports = router;
