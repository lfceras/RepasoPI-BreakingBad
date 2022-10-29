import axios from 'axios';
import { CLEAN_DETAILS, FILTER_BY_STATUS, FILTER_CREATED, GET_ALL_CHARACTERS, GET_DETAILS, GET_NAME_CHARACTERS, GET_OCCUPATIONS, ORDER_BY_NAME } from '../actionTypes';

export const getAllCharacters = ()=>{
  return async (dispatch)=>{
      const res = await axios.get(`http://localhost:3001/characters`)
      dispatch({
        type: GET_ALL_CHARACTERS,
        payload: res.data
  })
  }
}

export const getNameCharacters = (name)=>{
  return async (dispatch)=>{
    const res = await axios.get(`http://localhost:3001/characters?name=${name}`)
    dispatch({
      type: GET_NAME_CHARACTERS,
      payload: res.data
    })
  }
}

export const getDetails = (id)=>{
  return async (dispatch)=>{
    const detail = await axios.get(`http://localhost:3001/characters/${id}`)
    dispatch({
      type: GET_DETAILS,
      payload: detail.data[0]
    })
  }
}

export const cleanDetails = ()=>{
  return{
    type: CLEAN_DETAILS
  }
}

export const getOccupations = ()=>{
  return async (dispatch)=>{
    const occupations = await axios.get(`http://localhost:3001/occupations`)
    dispatch({
      type: GET_OCCUPATIONS,
      payload: occupations.data
    })
  }
}

export const postCharacter = (payload)=>{
  return async (dispatch)=>{
    const dates = await axios.post(`http://localhost:3001/characters`, payload)
    console.log(payload);
    return dates;
  }
}

export const filterCharactersByStatus = (payload)=>{
  return{
    type: FILTER_BY_STATUS,
    payload
  }
}

export const filterCreated = (payload) =>{
  return{
    type: FILTER_CREATED,
    payload
  }
}

export const orderByName = (payload)=>{
  return{
    type: ORDER_BY_NAME,
    payload
  }
}