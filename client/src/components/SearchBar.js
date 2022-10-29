import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNameCharacters } from '../redux/actions'
import styles from './searchBar.module.css'

const SearchBar = () => {
  const [character, setCharacter] = useState("")
  const dispatch = useDispatch()

  const handleInputChange = (e)=>{
    e.preventDefault()
    setCharacter(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(getNameCharacters(character))
    setCharacter("")
  }

  return (
    <div className={styles.searchPrincipal}>
      <input type="text" 
      className="text" 
      name='name'
      placeholder='Ingrese el nombre del personaje'
      value={character}
      onChange={(e)=> handleInputChange(e)}
      />
      <button type='submit'
      onClick={(e)=> handleSubmit(e)}
      >Buscar.....</button>
    </div>
  )
}

export default SearchBar