"use client";
import Link from "next/link";
import Searchbar from "../searchbar/searchbar";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import axios from "axios";
import { fetchData } from "next-auth/client/_utils";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({});
  const [cookieValue, setCookieValue] = useState(null);
  useEffect(() => {
    setCookieValue(
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("User_id"))
        ?.split("=")[1]
    );
  }, []);

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  useEffect(() => {
    const fetchData = async () => {
      // Verifica si hay sesión y si existe la cookie 'User_id'
      if (session || cookieValue) {
        setFlag(true);
      }
      if (cookieValue) {
        try {
          const response = await axios.get(
            `https://re-store.onrender.com/users/${cookieValue}`
          );
          const { data } = response;
          setUser(data);
        } catch (error) {
          // Manejar el error de la petición
        }
      }
    };

    fetchData();
  }, [session, flag, fetchData,cookieValue]);

  const handleLogOut = () => {
    if (cookieValue) {
      deleteCookie("User_id"); // Utiliza la función deleteCookie para borrar la cookie
      setFlag(false);
      setCookieValue(null)
    } else {
      signOut();
      setFlag(false);
    }
    router.push("/home");
  };

  return (
    <nav className="py-4 z-20 sticky top-0 bg-slate-900 text-slate-50">
      <div className="container px-4 mx-auto flex gap-4 justify-between">
        <Link className="link" href={"/home"}>
          Pagina Principal
        </Link>
        <div className="flex gap-8 justify-between items-center">
          {session ? (
            <Link
              className="link"
              href={{
                pathname: "/user",
                query: {
                  User: session.user.email,
                },
              }}
            >
              <img
                src={session.user.image}
                style={{ width: "35px", height: "35px" }}
                alt={session.user.name}
              />
            </Link>
          ) : null}

          {cookieValue ? (
            <Link
              className="link"
              href={{
                pathname: "/user",
                query: {
                  User: user.email,
                },
              }}
            >
              <Image
                src={user.imagenDePerfil}
                width="35"
                height="35"
                alt={user.nombre}
              />
            </Link>
          ) : null}

          {!flag ? (
            <Link className="link" href={"/login"}>
              Iniciar sesion
            </Link>
          ) : (
            <button onClick={handleLogOut}>Cerrar sesion</button>
          )}
          {flag ? (
            <Link className="link" href={"/form"}>
              Crear producto
            </Link>
          ) : null}
          <Searchbar />
          <Link href={"/cart"}>Carrito</Link>
        </div>
      </div>
    </nav>
  );
};