const express = require("express");
const router = express.Router();
const userController = require("../Controllers/controllersUser");
const {
  postVerifyUser,
  getVerifyUser,
} = require("../Controllers/verification");
const upload = require("../utils/multer");

// Ruta POST para crear un nuevo usuario
router.post("/", userController.createUserController);
router.put("/changePassword", userController.updatePasswordController);
router.put("/:id", userController.updateUser);
// Ruta POST para subir la foto de perfil del usuario
router.post(
  "/:id/foto-perfil",
  upload.single("profileImage"),
  userController.uploadProfilePhoto
);
// Ruta PUT para actualizar la foto de perfil del usuario
router.put(
  "/:id/foto-perfil",
  upload.single("profileImage"),
  userController.updateProfilePicture
);

router.get("/", userController.getUsersHandler);
router.get("/:id", userController.getUsersHandler);
router.get("/:email/email", userController.getEMAIL);
//--------------Verificaciones----------------------------------------------------------------//
router.post("/verify_email", postVerifyUser);
router.get("/verify_emaill/:uuid", getVerifyUser);

module.exports = router;
