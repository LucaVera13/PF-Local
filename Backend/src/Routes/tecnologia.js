const express = require("express");
const router = express.Router();
const {
  disabledProduct,
  getDisabledProducts,
} = require("../Controllers/disableProduct");
const {
  postProduct,
  getAllProducts,
  getAllProductsByCategory,
  getModelCategories,
} = require("../Controllers/controllersTecnologias");
const { ofertProduct, getOfertProducts } = require("../Controllers/ofertas");
const detailProduct = require("../Controllers/detail");
const Search = require("../Controllers/searchName");

const {
  getAccesorios,
  getComputacion,
  getElectronica,
  getConsolas,
  getCelulares,
} = require("../Controllers/subcategorias");
const upload = require("../utils/multer");

//----------getAllProducts---------------------------------------------------------------------------------------------------------------//
router.get("/allProducts", getAllProducts);
router.get("/allProducts", getAllProducts);
router.get("/subcategorias", getModelCategories);
//----------PostProducts---------------------------------------------------------------------------------------------------------------//
router.post("/posteo", upload.single("image"), postProduct);

//----------Disabled---------------------------------------------------------------------------------------------------------------//
router.put("/disabled", disabledProduct);
router.get("/disabled", getDisabledProducts);

//----------getSubCategories---------------------------------------------------------------------------------------------------------------//
router.get("/categoria/:category", getAllProductsByCategory);

//----------Ofertas---------------------------------------------------------------------------------------------------------------//
router.get("/Ofertas", getOfertProducts);
router.put("/Ofertas", ofertProduct);
//-----------Detail-------------------------------------------------------------------------------------------------------------//
router.get("/Detail/:id", detailProduct);
//-----------SearchByName-------------------------------------------------------------------------------------------------------------//
router.get("/searchName", Search);

// subcatgoria

router.get("/Computacion/:compu", getComputacion);
router.get("/ElectronicaAudioVideo/:electro", getElectronica);
router.get("/ConsolasyVideojuegos/:conso", getConsolas);
router.get("/Celulares/:celu", getCelulares);
router.get("/CamarasyAccesorios/:cam", getAccesorios);

module.exports = router;
