"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Signup.css";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

function Signup() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has("token")) {
      const token = urlParams.get("token");
      const userName = urlParams.get("userName");
      const password = urlParams.get("password");
      const email = urlParams.get("email");
      const genero = urlParams.get("genero");
      const nacimiento = urlParams.get("nacimiento");
      const ciudad = urlParams.get("ciudad");
      const direccion = urlParams.get("direccion");
      const codigoPostal = urlParams.get("codigoPostal");
      const apellido = urlParams.get("apellido");

      const handleQuery = async () => {
        try {
          const decodedToken = decodeURIComponent(token);
          const decodedApellido = decodeURIComponent(apellido);
          const decodedUserName = decodeURIComponent(userName);
          const decodedPassword = decodeURIComponent(password);
          const decodedEmail = decodeURIComponent(email);
          const decodedGenero = decodeURIComponent(genero);
          const decodedNacimiento = decodeURIComponent(nacimiento);
          const decodedCiudad = decodeURIComponent(ciudad);
          const decodedDireccion = decodeURIComponent(direccion);
          const decodedCodigoPostal = decodeURIComponent(codigoPostal);
          console.log(decodedToken);
          const { data } = await axios.get(
            `https://re-store.onrender.com/users/verify_emaill/${decodedToken}`
          );

          if (data.token === decodedToken) {
            await axios.post("https://re-store.onrender.com/users", {
              nombre: decodedUserName,
              apellido: decodedApellido,
              contraseña: decodedPassword,
              email: decodedEmail,
              genero: decodedGenero,
              fechaNacimiento: decodedNacimiento,
              ubicacion: [
                {
                  ciudad: decodedCiudad,
                  direccion: decodedDireccion,
                  codigoPostal: Number(decodedCodigoPostal),
                },
              ],
            });
            setMessage("Usuario Creado");
          } else {
            setMessage("Verificación denegada");
          }
        } catch (error) {
          console.log(error);
        }
      };

      handleQuery();
    }
  }, []);
  useEffect(() => {
    // Guardar los estilos originales del body
    const originalStyles = {
      display: document.body.style.display,
      justifyContent: document.body.style.justifyContent,
      minHeight: document.body.style.minHeight,
      background: document.body.style.background,
      alignItems: document.body.style.alignItems,
    };

    // Aplicar los nuevos estilos al body
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.background = "#0f172a";
    document.body.style.alignItems = "center";

    // Restaurar los estilos originales al desmontar el componente
    return () => {
      document.body.style.display = originalStyles.display;
      document.body.style.justifyContent = originalStyles.justifyContent;
      document.body.style.minHeight = originalStyles.minHeight;
      document.body.style.background = originalStyles.background;
      document.body.style.alignItems = originalStyles.alignItems;
    };
  }, []);

  const URL = "https://re-store.onrender.com/users";

  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    userLastName: "",
    email: "",
    password: "",
    confirm_password: "",
    genero: "",
    fechaNacimiento: "",
    ubiCiudad: "",
    ubiDireccion: "",
    ubiCodigoPostal: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    userLastName: "",
    email: "",
    password: "",
    confirm_password: "",
    genero: "",
    fechaNacimiento: "",
    ubiCiudad: "",
    ubiDireccion: "",
    ubiCodigoPostal: "",
  });
  console.log(user);
  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------
  async function validate(user) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
    const error = {};

    if (user.userName && user.userName.length > 30) {
      error.userName = "Por favor ingresa solo tu primer nombre";
    }

    if (user.LastName && user.LastName.length > 40) {
      error.userName = "Por favor ingresa solo 1 apellido";
    }

    if (!emailRegex.test(user.email)) {
      error.email = "Debes ingresar un email válido";
    }

    try {
      if (user.email) {
        const { data } = await axios.get(
          `https://re-store.onrender.com/users/${user.email}/email`
        );
        if (!data.error) {
          const mailFind = data.find((userr) => userr?.email === user.email);

          if (mailFind) {
            error.email = "Email ya existe";
          }
        }
      }
    } catch (error) {
      error.email = "Error de conexión";
      return error;
    }

    if (!passwordRegex.test(user.password)) {
      error.password =
        "Debes ingresar una contraseña con una mayúscula, un número y un carácter especial";
    }

    if (user.password !== user.confirm_password) {
      error.confirm_password = "Las contraseñas no son las mismas";
    }

    if (!user.genero) {
      error.genero = "Debes completar este campo";
    }

    if (!user.fechaNacimiento) {
      error.fechaNacimiento = "Debes indicar tu fecha de Nacimiento";
    }

    return error;
  }

  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------
  const handleInputs = async (event) => {
    const input_name = event.target.name;
    const input_value = event.target.value;

    setUser({
      ...user,
      [input_name]: input_value,
    });
    if (flag === true) {
      setFlag(false);
    }
  };
  // console.log(user);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = await validate(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (flag) {
        setFlag(false); // Cambia flag a false si ya se creó un usuario anteriormente
      } else {
        const uuid = uuidv4();
        await axios.post("https://re-store.onrender.com/users/verify_email", {
          email: user.email,
          uuid,
          userName: user.userName,
          apellido: user.userLastName,
          password: user.password,
          genero: user.genero,
          nacimiento: user.fechaNacimiento,
          ubiCiudad: user.ubiCiudad,
          ubiDireccion: user.ubiDireccion,
          ubiCodigoPostal: user.ubiCodigoPostal,
        });

        setFlag(true);
      }
    }
  };

  return (
    <div className="sign-body">
      <div className="container_sign">
        <form onSubmit={handleSubmit} className="form">
          <h2>Sign up</h2>
          <div className="inputBox">
            <input
              type="text"
              required
              name="userName"
              value={user.userName}
              onChange={handleInputs}
            ></input>

            <span className="sign-span">Nombre</span>
            <p className="erorrp">{errors.userName}</p>
          </div>
          <div className="inputBox">
            <input
              type="text"
              required
              name="userLastName"
              value={user.userLastName}
              onChange={handleInputs}
            ></input>

            <span className="sign-span">Apellido</span>
            <p className="erorrp">{errors.userLastName}</p>
          </div>
          <div className="inputBox">
            <input
              type="email"
              required
              name="email"
              value={user.email}
              onChange={handleInputs}
            ></input>

            <span className="sign-span">Direccion Email</span>
            <p className="erorrp">{errors.email}</p>
          </div>
          <div className="inputBox">
            <input
              type="password"
              required
              name="password"
              value={user.password}
              onChange={handleInputs}
            ></input>

            <span className="sign-span">Crear Contraseña</span>
            <p className="erorrp">{errors.password}</p>
          </div>
          <div className="inputBox">
            <input
              type="password"
              required
              name="confirm_password"
              value={user.confirm_password}
              onChange={handleInputs}
            ></input>
            <span className="sign-span">Confirma Contraseña</span>
            <p className="erorrp">{errors.confirm_password}</p>
          </div>
          <div className="inputBox">
            <select name="genero" defaultValue="" onChange={handleInputs}>
              <option name="genero" value="" disabled hidden>
                Selecciona un género
              </option>
              <option name="genero" value="Masculino">
                Masculino
              </option>
              <option name="genero" value="Femenino">
                Femenino
              </option>
              <option name="genero" value="Otro">
                Otro
              </option>
            </select>
            <p className="erorrp">{errors.genero}</p>
          </div>
          <div className="inputBox">
            <input
              type="date"
              required
              name="fechaNacimiento"
              value={user.fechaNacimiento}
              onChange={handleInputs}
            ></input>
            <p className="erorrp">{errors.fechaNacimiento}</p>
          </div>
          <div className="inputBox">
            <input
              type="text"
              required
              name="ubiCiudad"
              value={user.ubiCiudad}
              onChange={handleInputs}
            ></input>
            <span className="sign-span">Ciudad donde vives</span>
            <p className="erorrp">{errors.ubiCiudad}</p>
          </div>
          <div className="inputBox">
            <input
              type="text"
              required
              name="ubiDireccion"
              value={user.ubiDireccion}
              onChange={handleInputs}
            ></input>
            <span className="sign-span">Direccion</span>
            <p className="erorrp">{errors.ubiDireccion}</p>
          </div>
          <div className="inputBox">
            <input
              type="number"
              required
              name="ubiCodigoPostal"
              value={user.ubiCodigoPostal}
              onChange={handleInputs}
            ></input>
            <span className="sign-span">Codigo Postal</span>
            <p className="erorrp">{errors.ubiCodigoPostal}</p>
          </div>
          <div className="inputBox">
            <input type="submit" value="Crea tu cuenta"></input>
          </div>
          <p id="userCreatedMessage">{flag ? "Verifica tu email" : null}</p>
          <p id="userCreatedMessage">{message}</p>
          <p>
            Ya sos miembro?{" "}
            <Link href={"/login"}>
              <p id="asd" className="login">
                Log in
              </p>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
