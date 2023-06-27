"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "../navbar/navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./Ubicaciones.css";
import Link from "next/link";
import BackButton from '@/app/components/backButton/BackButton';

function Ubicaciones() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userData, setData] = useState(null);
  const [user, setUser] = useState({
    direccion: "",
    ciudad: "",
    codigoPostal: "",
  });
  const [flag, setFlag] = useState(false);
  const [form, setForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    if (!session && !document.cookie.includes("User_id")) {
      router.push("/login");
      return;
    }
  }, []);

  
  const handleSearch = async (idUser) => {
    const response = await axios.get(`https://re-store.onrender.com/users/${idUser}`);
    const { data } = response;
    setData(data.ubicacion);
    return data.ubicacion;
  };
  useEffect(() => {

    if (session) {
      let idUser = session.user.id;
      handleSearch(idUser);
    } else {
      if (document.cookie.includes("User_id")) {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("User_id="))
          .split("=")[1];
        handleSearch(cookieValue);
      }
    }
  }, [session]);

  const handleDelete = async (id) => {
    try {
      await axios.put("https://re-store.onrender.com/users/ubication/delete", {
        id: id,
      });

      // Actualizar el estado local eliminando la ubicación eliminada
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Error al eliminar la ubicación:", error);
    }
  };

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

  const handleSubmit = async () => {
    if (flag) {
      setFlag(false);
    } else {
      await axios.put("https://re-store.onrender.com/users/ubication/modify", {
        id: editingId,
        ciudad: user.ciudad,
        direccion: user.direccion,
        codigoPostal: user.codigoPostal,
      });

      setFlag(true);
      setForm(false);

      // Actualizar los datos de ubicación después de la modificación
      let updatedData;
      if (session) {
        updatedData = await handleSearch(session.user.id);
      } else {
        if (document.cookie.includes("User_id")) {
          const cookieValue = document.cookie
            .split("; ")
            .find((row) => row.startsWith("User_id="))
            .split("=")[1];
          updatedData = await handleSearch(cookieValue);
        }
      }
      setData(updatedData);
    }
  };

  const handleEdit = async (id) => {
    setEditingId(id)
    setForm(true)
  };

  return (
    <div>
      <Navbar></Navbar>
      <BackButton />
      <div className="containerUbi">
        {userData &&
          userData.map((e) => (
            <div className="cardUbi" key={e.direccion}>
              <h1>{e.direccion}</h1>
              <h3>{e.ciudad}</h3>
              <h3>{e.codigoPostal}</h3>
              <p onClick={() => handleEdit(e._id)}>Editar</p>
              <p onClick={() => handleDelete(e._id)}>Eliminar</p>
            </div>
          ))}
      </div>
      <div className="containerpppp">
        <Link href={"/user/ubicacion/form"}>
          <p className="asdasda">Agregar Ubicacion</p>
        </Link>
        {form ? (
          <form onSubmit={(e) => e.preventDefault()} className="asder">
            <div className="aaaa">
              <input
                type="text"
                required
                name="ciudad"
                value={user.ciudad}
                onChange={handleInputs}
              ></input>
              <span className="eee">Ciudad donde vives</span>
            </div>
            <div className="aaaa">
              <input
                type="text"
                required
                name="direccion"
                value={user.direccion}
                onChange={handleInputs}
              ></input>
              <span className="eee">Direccion</span>
            </div>
            <div className="aaaa">
              <input
                type="number"
                required
                name="codigoPostal"
                value={user.codigoPostal}
                onChange={handleInputs}
              ></input>
              <span className="eee">Codigo Postal</span>
            </div>
            <div>
              <input
                className="aasd"
                type="submit"
                value="Modificar Ubicacion"
                onClick={() => handleSubmit()}
              ></input>
            </div>
          </form>
        ) : null}
        <p id="userCreatedMessage">{flag ? "Ubicacion modificada" : null}</p>
      </div>
    </div>
  );
}

export default Ubicaciones;