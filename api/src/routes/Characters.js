const { Router } = require("express");
const { mergeDataBase } = require("./controllers.js");
const { Character, Occupation } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const allCharacters = await mergeDataBase();
    // console.log(allCharacters);
    if (name) {
      const charactersFiltered = allCharacters.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );

      return charactersFiltered.length
        ? res.status(200).json(charactersFiltered)
        : res.status(200).json("Not Found");
    }

    return res.status(200).send(allCharacters);
  } catch (error) {
    console.log("AQUI ESTA EL ERROR", error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, nickname, birthday, status, image, occupation, create } =
      req.body;

    if (!name || !nickname || !birthday || !status || !image) {
      res.status(404).send("Te falta llenar algunos campos");
    }

    const characterCreated = await Character.create({
      name,
      nickname,
      birthday,
      status,
      image: image || "",
      create,
    });

    const occupationDb = await Occupation.findAll({
      where: {
        name: occupation,
      },
    });

    characterCreated.addOccupation(occupationDb);

    res.status(201).send(characterCreated);
  } catch (error) {
    console.log("ERROR EN EL POST", error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allCharacters = await mergeDataBase();

    if (id) {
      const filteredId = allCharacters.filter((el) => el.id == id);

      return filteredId.length
        ? res.status(200).json(filteredId)
        : res.status(200).json("Not Found");
    }
  } catch (error) {
    console.log("ERROR EN ID", error);
  }
});

module.exports = router;
