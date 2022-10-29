import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { cleanDetails, getDetails } from '../redux/actions'
import './detail.css'

const Detail = () => {
  const {id} = useParams()
  // console.log(id);
  const dispatch = useDispatch()
  const details = useSelector(state => state.details)
  useEffect(()=>{
    dispatch(getDetails(id))

    return ()=>{dispatch(cleanDetails())}
  },[dispatch, id])

  return (
    <div className='principalDetail'>

      <div className='cardDetail'>
    <Link to={'/home'}>
      <button>Regresar</button>
    </Link>
      {
        <div>
          <p>Nombre: </p>
          <h1>{details.name}</h1>
          <img src={details.img 
          ? details.img
          : details.image} alt="Not found"
          style={{"width":  "200px",
          "height": "250px",
          "borderRadius":"15px 15px 0 0"
        }}/>
        <p>Stattus: </p>
        <h2>{details.status}</h2>
        <p>Cumpleaños: </p>
        <h2>{details.birthday}</h2>
        <p>Ocupaciones: </p>
        <h3>
          {
          !details.create 
          ? details.occupation + " "
          : details.occupations.map(el => el.name + (" "))
          }
        </h3>
        </div>
      }
      </div>
    </div>
  )
}

export default Detail