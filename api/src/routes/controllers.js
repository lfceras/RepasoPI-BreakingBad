const axios = require('axios');
const { Character, Occupation } = require('../db.js')

const getAllCharacters = async ()=>{
  const characters = await axios.get(`https://breakingbadapi.com/api/characters`)
  const result = await characters.data?.map(el => {
    return{
      id: el.char_id,
      name: el.name,
      nickname: el.nickname,
      birthday: el.birthday,
      status: el.status,
      image: el.img || "",
      occupation: el.occupation.map(el => el),
      appearance: el.appearance.map(el => el)

    }
  })
  return result
}

// const myDataBase = async () => {
//   const  myDb = await Character.findAll()
//   if(!myDb.length){
//     const allData = await getAllCharacters()
//     await Character.bulkCreate(allData)
//   }
// }

// const allCharacters = async () => {await myDataBase()}
// allCharacters()

const myDataBase = async () => {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name"],
      through:{
        attributes: []
      }
    }
  })
}

const mergeDataBase = async () => {
  const data1 = await getAllCharacters()
  const data2 = await myDataBase() 
  const allData = data1.concat(data2)
  return allData
} 

module.exports = {
  mergeDataBase
}

