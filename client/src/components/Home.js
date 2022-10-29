import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCharactersByStatus,
  filterCreated,
  getAllCharacters,
  orderByName,
} from "../redux/actions";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from "./home.module.css";
import SearchBar from "./SearchBar";

const Home = () => {
  const characters = useSelector((state) => state.characters);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [orden, setOrden] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(5);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllCharacters());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllCharacters());
  };

  const handleFilterStatus = (e) => {
    dispatch(filterCharactersByStatus(e.target.value));
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}}`);
  };

  return (
    <div className={styles.principal}>

      <SearchBar />
    <div className={styles.all}>
    <button onClick={(e) => handleClick(e)}>Recargar</button>

      <Link to={"/create"}>
        <button id={styles.crear}>Crear Personaje</button>
      </Link>

      <Link to={"/"}>
        <button>Inicio</button>
      </Link>
    </div>


      <div className={styles.filters}>
        <div>
          <label>Ordenar por: </label>
          <select id="" onChange={(e) => handleSort(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>

        <div>
          <label>Seleccionar por Status: </label>
          <select id="sltc" onChange={(e) => handleFilterStatus(e)}>
            <option value="All">Todos</option>
            <option value="Presumed dead">Presuntamente Muerto</option>
            <option value="Alive">Vivo</option>
            <option value="Deceased">Muerto</option>
            <option value="Unknown">Desconocido</option>
          </select>
        </div>

        <div>
          <label>Seleccionar Personajes: </label>
          <select id="" onChange={(e) => handleFilterCreated(e)}>
            <option value="All">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Existentes</option>
          </select>
        </div>
      </div>

      <Paginado
        charactersPerPage={charactersPerPage}
        characters={characters.length}
        paginado={paginado}
      />

      <div className={styles.cards}>
        {currentCharacters?.map((el) => {
          return (
            <Card
              key={el.id}
              id={el.id}
              name={el.name}
              nickname={el.nickname}
              image={el.img ? el.img : el.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
