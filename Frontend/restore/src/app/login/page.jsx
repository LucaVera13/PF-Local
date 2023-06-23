"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import "./login.css";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const URL = "http://localhost:3001/users";
  // ----------------------------------------------------------------Hooks------------------------------------------------------------------------------

  // ----------------------------------------------------------------States------------------------------------------------------------------------------
  const [submitted, setSubmitted] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------

  async function validate(user) {
    const error = {};
    let userFind = null;
  
    try {
      if (user.email && user.email) {
        const { data } = await axios.get(
          `http://localhost:3001/users/${user.email}/email`
        );
        if (data.error) {
          error.email = "Usuario no existe";
          return error;
        }
  
        if (user.password) {
          const passwordMatch = await bcrypt.compare(
            user.password,
            data.contraseña
          );
          if (!passwordMatch) {
            error.password = "Contraseña incorrecta";
          }
        }
      }
    } catch (error) {
      // Manejo explícito del error de Axios
      error.email = "Usuario no existe";
      return error;
    }
  
    return error;
  }

  // ----------------------------------------------------------------Validates------------------------------------------------------------------------------

  useEffect(() => {
    // Aplicar estilos al body cuando el componente se monta

    document.body.style.background = "black";

    // Restaurar los estilos originales del body cuando el componente se desmonta
    return () => {
      document.body.style.background = "";
    };
  }, []);
  // ----------------------------------------------------------------Handlers------------------------------------------------------------------------------

  const handleInputs = (event) => {
    const input_name = event.target.name;
    const input_value = event.target.value;
    setUser({
      ...user,
      [input_name]: input_value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = await validate(user);
    setErrors(validationErrors);
    setSubmitted(true);
    console.log("aqui");
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("isLoggedIn", "true");
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      const { data } = await axios.get(
        `http://localhost:3001/users/${user.email}/email`
      );
      document.cookie = `User_id=${
        data._id
      }; expires=${expirationDate.toUTCString()}; path=/`;
      router.push("/home");
    }
    setSubmitted(false);
  };

  return (
    <div className="BodyDiv">
      <div className="containerLogIn">
        <div className="BoxLogin">
          <div className="cover"></div>
          <div className="shadow"></div>
          <div className="content">
            <form className="formLogin" onSubmit={handleSubmit}>
              <h3 className="logo">
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/android/40/000000/key.png"
                  alt="key"
                />
              </h3>
              <h2>Login</h2>
              <div className="inputBox">
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                  required
                ></input>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-sharp/24/000000/user.png"
                  alt="user"
                />
                <span>Email</span>
              </div>
                <p className="error-login">{errors.email}</p>
              <div className="inputBox">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                  required
                ></input>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-glyphs/30/000000/lock--v1.png"
                  alt="lock--v1"
                />
                <span>Contraseña</span>
              </div>
                <p className="error-login">{errors.password}</p>
              <div className="links">
                <Link href={"/login/changepassword"}>
                <p>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios-filled/50/000000/question-mark.png"
                    alt="question-mark"
                  />
                  Cambiar contraseña
                </p>
                </Link>
                <Link href={"/login/signup"}>
                <p>
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-user-medical-kiranshastry-solid-kiranshastry.png"
                    alt="external-user-medical-kiranshastry-solid-kiranshastry"
                  />
                  Crear Cuenta
                </p>
                </Link>
              </div>
              <div className="inputBox">
                <input
                  type="submit"
                  value="Login"
                  disabled={Object.keys(errors).length > 0 && submitted}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
