import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOccupations, postCharacter } from "../redux/actions";
import './createCharacter.css'

const validate = (input)=>{
  let errors = {}
  if(!input.name){
    errors.name = "Se requiere un nombre"
  }
  if(!input.nickname){
    errors.nickname = "Nickname debe ser completado"
  }
  if(!input.birthday){
    errors.birthday = "Debes ingresar una fecha de cumpleaños"
  }
  if(!input.image){
    errors.image = "Te falta ingresar una imagen"
  }
  return errors;
}


const CreateCharacter = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const occupations = useSelector((state) => state.occupations);
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    image: "",  
    occupation: [],
  });

  const handleChange = (e)=>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleCheck = (e)=>{
    if(e.target.checked){
      setInput({
        ...input,
        status: e.target.value
      })
    }
  }

  const handleSelect = (e)=>{
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value]
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log(input);
    dispatch(postCharacter(input))
    alert("Se ha creado el personaje!!!")
    setInput({
      name: "",
      nickname: "",
      birthday: "",
      status: "",
      image: "",   
      occupation: [],
    })
    history.push('/home')
  }

  const handleDelete = (el)=>{
    setInput({
      ...input,
      occupation: input.occupation.filter(occ => occ !== el)
    })
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, [dispatch]);

  return (
    <div className="principalContainer">
      <Link to={"/home"}>
        <button>Regresar</button>
      </Link>
      <h1>Crea tu personaje!!!!</h1>
      <div className="formContainer">
      <form onSubmit={(e)=> handleSubmit(e)} 
      >
        <div>
          <label>Nombre: </label>
          <input type="text" 
          className="name" 
          name="name" 
          value={input.name} 
          onChange={(e)=> handleChange(e)}
          />
          {
            errors.name && (<p
              style={{"color":"red", "fontSize":"15px", "fontWeight":"bolder"}}
            >{errors.name}</p>)
          }
        </div>

        <div>
          <label>Nickname: </label>
          <input
            type="text"
            className="name"
            name="nickname"
            value={input.nickname}
            onChange={(e)=> handleChange(e)}
          />
           {
            errors.nickname && (<p
            style={{"color":"red", "fontSize":"15px", "fontWeight":"bolder"}}
            >{errors.nickname}</p>)
          }
        </div>

        <div>
          <label>Cumpleaños: </label>
          <input
            type="text"
            className="name"
            name="birthday"
            value={input.birthday}
            onChange={(e)=> handleChange(e)}
          />
           {
            errors.birthday && (<p
              style={{"color":"red", "fontSize":"15px", "fontWeight":"bolder"}}
            >{errors.birthday}</p>)
          }
        </div>

        <div>
          <label>Imagen: </label>
          <input
            type="text"
            className="name"
            name="image"
            value={input.image}
            onChange={(e)=> handleChange(e)}
          />
            {
            errors.image && (<p
              style={{"color":"red", "fontSize":"15px", "fontWeight":"bolder"}}
            >{errors.image}</p>)
          }
        </div>

        <div id="inputs">
          <label className="stattus">Status: </label>
          <label>
            <input
              type="checkbox"
              className="text"
              name="Alive"
              value="Alive"
              onChange={(e)=> handleCheck(e)}
            />
            Alive
          </label>

          <label>
            <input
              type="checkbox"
              className="text"
              name="Deceased"
              value="Deceased"
              onChange={(e)=> handleCheck(e)}
            />
            Deceased
          </label>

          <label>
            <input
              type="checkbox"
              className="text"
              name="Unknown"
              value="Unknown"
              onChange={(e)=> handleCheck(e)}
            />
            Unknown
          </label>
        </div>

        <div>
          <select onChange={(e)=> handleSelect(e)}>
            {occupations?.map((el) => (
              <option key={el.id} value={el.name}>{el.name}</option>
            ))}
          </select>
        </div>
        
        <ul>{input.occupation.map(el => el + " ")}</ul>

        <button type="submit">Crear personaje</button>
      </form>
      <div id="occupation"> 
      {
        input.occupation.map(el => 
          <div key={el}>   
            <p>{el}</p>
            <button onClick={()=>handleDelete(el)}>X</button>
          </div>
          )
      }
      </div>
      </div>
    </div>
  );
};

export default CreateCharacter;
