const User = require("../Database/models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Número de rondas de hashing
const { cloudinary } = require("../utils/cloudinary");

const createUser = async ({
  nombre,
  apellido,
  email,
  contraseña,
  genero,
  fechaNacimiento,
  ubicacion,
  metodosPago,
  image,
}) => {
  const searchEmail = await User.findOne({ email });
  if (searchEmail) {
    throw Error("Ya existe un usuario con este email");
  }

  // Generar el hash de la contraseña

  const hashedPassword = contraseña
    ? await bcrypt.hash(contraseña, saltRounds)
    : "";

  const newUser = new User({
    nombre,
    apellido,
    email,
    contraseña: hashedPassword, // Guardar el hash en lugar de la contraseña en texto plano
    genero,
    fechaNacimiento,
    ubicacion,
    metodosPago,
    image,
  });

  const savedUser = await newUser.save();

  return savedUser;
};

const createUserController = async (req, res) => {
  const {
    nombre,
    apellido,
    email,
    contraseña,
    genero,
    fechaNacimiento,
    ubicacion,
    metodosPago,
    image,
  } = req.body;

  console.log(req.body);
  try {
    const savedUser = await createUser({
      nombre,
      apellido,
      email,
      contraseña,
      genero,
      fechaNacimiento,
      ubicacion,
      metodosPago,
      image,
    });

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.file) {

      const previousProfilePictureUrl = user.profile_picture;
      console.log(previousProfilePictureUrl);
  
      if (previousProfilePictureUrl) {
        await cloudinary.uploader.destroy(previousProfilePictureUrl);
      }

      
      const cloudinaryImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "Foto de perfil",
      });
    }
     // user.profile_picture = cloudinaryImage.secure_url;
    const update = {
      $set: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        genero: req.body.genero,
        fechaNacimiento: req.body.fechaNacimiento,
        ubicacion: req.body.ubicacion,
        metodosPago: req.body.metodosPago,
      },
    };

    const updtUser = await User.findOneAndUpdate({ _id: id }, update, { new: true });


  

   


    res.status(200).json(updtUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar los datos del usuario" });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Generar el hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Actualizar la contraseña del usuario
    user.contraseña = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al cambiar la contraseña" });
  }
};

const getUsersHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.status(200).json(user);
    } else {
      // Obtener todos los usuarios
      const users = await User.find();

      return res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const getEMAIL = async (req, res) => {
  try {
    const { email } = req.params;
    if (email) {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({ error: "Usuario no encontrado" });
      }

      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verifica si se ha proporcionado una imagen en la solicitud
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Por favor, seleccione una imagen para subir" });
    }

    // Sube la imagen a Cloudinary
    const cloudinaryImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "Foto de perfil",
    });

    // Actualiza la foto de perfil del usuario
    user.fotoPerfil = cloudinaryImage.secure_url;

    await user.save();

    return res
      .status(200)
      .json({ message: "Foto de perfil subida exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "Error al subir la foto de perfil" });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Obtén la URL de la foto de perfil anterior
    const previousProfilePictureUrl = user.profile_picture;
    console.log(previousProfilePictureUrl);

    // Elimina la foto de perfil anterior de Cloudinary
    if (previousProfilePictureUrl) {
      await cloudinary.uploader.destroy(previousProfilePictureUrl);
    }

    // Sube la nueva foto de perfil a Cloudinary
    const cloudinaryImage = await cloudinary.uploader.upload(req.file.path, {
      folder: "Foto de perfil",
    });

    // Guarda la URL de la nueva foto de perfil en la base de datos
    user.profile_picture = cloudinaryImage.secure_url;
    await user.save();

    res
      .status(200)
      .json({ message: "Foto de perfil actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cambiar la foto de perfil" });
  }
};

module.exports = {
  updatePasswordController,
  uploadProfilePhoto,
  updateUser,
  getUsersHandler,
  createUserController,
  getEMAIL,
};
