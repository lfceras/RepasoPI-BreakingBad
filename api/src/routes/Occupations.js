const { Router } = require("express");
const mergeDataBase = require("./controllers.js");
const { Character, Occupation } = require("../db.js");
const axios = require("axios");

const router = Router();

router.get('/', async (req, res) => {
  try {
    const getOccupations = await axios.get(`https://breakingbadapi.com/api/characters`)

    const allOccupations = getOccupations.data?.map(el => el.occupation) 
    const filterOccupations = allOccupations.flat()
    const filterOccupations2 = [...new Set(filterOccupations)]
  
    filterOccupations2.forEach(el => {
      Occupation.findOrCreate({
        where: {
          name: el
        } 
      })
    })
    const allOccupations2 = await Occupation.findAll()
    res.status(200).send(allOccupations2)
  } catch (error) {
    console.log("ERROR EN OCCUPATION", error);
  }


})


module.exports = router;
