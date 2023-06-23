const TechSchema = require("../Database/Models/Technology");
const { cloudinary } = require("../utils/cloudinary");

const postProduct = async (req, res) => {
  const {
    name,
    state,
    precio,
    subcategoria,
    Description,
    Marca,
    Ubicacion,
    Ofertas,
  } = req.body;

  if (!req.file) {
    return res.send("Porfavor seleccione una imagen para subir");
  }
  const parsedCategoria = JSON.parse(subcategoria);

  try {
    const cloudinaryImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "Proyecto Final",
    });

    const newProduct = new TechSchema({
      name,
      state,
      background_image: cloudinaryImage.secure_url,
      precio,
      Description,
      Marca,
      Ubicacion,
      subcategoria: parsedCategoria,
      Ofertas,
    });

    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Post failed" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await TechSchema.find();

    res.status(200).json({ result: allProducts });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los productos" });
    console.error(error);
  }
};

const getAllProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const productos = await TechSchema.find({
      [`subcategoria.${category}`]: { $exists: true },
    });

    res.status(200).json({ result: productos });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Error al obtener los productos de ${category}` });
    console.error(error);
  }
};

const getModelCategories = (req, res) => {
  let model = [
    {
      name: "TV",
      subcategoria: [],
      marca: [
        "Samsung",
        "LG",
        "Sony",
        "Panasonic",
        "TCL",
        "Hisense",
        "Philips",
        "Otro",
      ],
    },
    {
      name: "Computacion",
      subcategoria: [
        "notebook",
        "PcEscritorio",
        "Monitores",
        "AccesoriosPc",
        "Sillas",
        "Componentes",
        "Impresoras",
        "Proyectores",
        "Conectividad",
        "Tablets",
        "AccesoriosTablet",
      ],
      marca: ["Otro", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Apple"],
    },
    {
      name: "ElectronicaAudioVideo",
      subcategoria: [
        "Amplificadores",
        "AsistentesVirtuales",
        "Auriculares",
        "EquiposDj",
        "AccesoriosDj",
        "EstudiodeGrabacion",
        "Grabadoras",
        "HomeTheatre",
        "Megafonos",
        "Microfonos",
        "Parlantes",
        "Radios",
        "Radios",
        "Tocadiscos",
        "AccesoriosParaAudio",
        "ComponentesElectronicos",
        "Drones",
      ],
      marca: [
        "Sony",
        "Samsung",
        "LG",
        "Panasonic",
        "Bose",
        "JBL",
        "Denon",
        "Otro",
      ],
    },
    {
      name: "ConsolasyVideojuegos",
      subcategoria: ["Consolas", "Videojuegos", "Accesorios"],
      marca: [
        "Sony",
        "Microsoft",
        "Nintendo",
        "Sega",
        "Atari",
        "SNK",
        "NEC",
        "Otro",
      ],
    },
    {
      name: "Celulares",
      subcategoria: ["Smartphones", "Fundas", "Cargadores"],
      marca: [
        "Apple",
        "Samsung",
        "Huawei",
        "Xiaomi",
        "Google",
        "OnePlus",
        "Motorola",
        "Otro",
      ],
    },
    {
      name: "CamarasyAccesorios",
      subcategoria: [
        "Camaras",
        "CamarasFilmadoras",
        "Lentes",
        "EstudioseIluminacion",
        "CargadoresyBaterias",
        "Soportes",
        "Telescopios",
        "Binoculares",
        "Microscopios",
      ],
      marca: [
        "Canon",
        "Nikon",
        "Sony",
        "Fujifilm",
        "Leica",
        "Panasonic",
        "Olympus",
        "Otro",
      ],
    },
  ];
  try {
    res.status(200).json(model);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  postProduct,
  getAllProducts,
  getAllProductsByCategory,
  getModelCategories,
};
