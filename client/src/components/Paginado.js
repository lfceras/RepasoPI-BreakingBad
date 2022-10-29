import React from "react";
import styles from './paginado.module.css'

const Paginado = ({ charactersPerPage, characters, paginado }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(characters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav >
        <ul className={styles.numeros} >
          {pageNumbers?.map((number) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a 
            className={styles.unique}
            key={number}
            onClick={() => paginado(number)}>{number}</a>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
