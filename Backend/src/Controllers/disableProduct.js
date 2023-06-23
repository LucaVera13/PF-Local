const TechSchema = require("../Database/Models/Technology");

const disabledProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await TechSchema.findOneAndUpdate(
      { _id: id },
      { Disabled: true },
      { new: true }
    );

    res.status(200).json({ message: "Product disabled successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error disabling product" });
    console.error(error);
  }
};

const getDisabledProducts = async (req, res) => {
  try {
    const disabledProducts = await TechSchema.find({ Disabled: true });
    res.status(200).json({ result: disabledProducts });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error al obtener productos deshabilitados" });
    console.error(error);
  }
};

module.exports = { disabledProduct, getDisabledProducts };
