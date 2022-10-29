import React from 'react'
import { Link } from 'react-router-dom'
import styles from './card.module.css'


const Card = ({id,name, image, nickname}) => {
  return (
    <div>
      <div className={styles.card}>
      <Link to={`/detail/${id}`} 
      style={{"textDecoration":"none"}}
      >
      <img src={image} alt="Not Found" 
      className={styles.image}
      />
      <h2>Nombre: </h2>
      <h3>{name}</h3>
      </Link>
      <h2>Nickname: </h2>
      <h5>{nickname}</h5>
      </div>
    </div>
  )
}

export default Card