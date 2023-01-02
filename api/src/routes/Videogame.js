const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { Key_Api } = process.env;


const router = Router();

// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}

// GET https://api.rawg.io/api/games/{id}
// ?key=21ed8a1220d7428a83c19eceb04229a2

const getApiGames = async () => {
  const api = await axios.get(
    `https://api.rawg.io/api/games?key=${Key_Api}&page=1`
  );
  const api2 = await axios.get(
    `https://api.rawg.io/api/games?key=${Key_Api}&page=2`
  );
  const api3 = await axios.get(
    `https://api.rawg.io/api/games?key=${Key_Api}&page=3`
  );
  const api4 = await axios.get(
    `https://api.rawg.io/api/games?key=${Key_Api}&page=4`
  );
  const api5 = await axios.get(
    `https://api.rawg.io/api/games?key=${Key_Api}&page=5`
  );

  allApi = api.data.results.concat(
    api2.data.results,
    api3.data.results,
    api4.data.results,
    api5.data.results
  );
  let apiInfo = allApi.map((game) => {
    const platforms = game.platforms.map(platforms => platforms.platform.name);
    const genres = game.genres.map(genre => " " + genre.name);
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      platform: platforms,
      genres: genres.toString(),
    };
  });
  return apiInfo;
};

const getDBGames = async () => {
  let db = await Videogame.findAll({ include: [Genre] });
  db = db.map(game => {
    const genres = game.genres.map(genre => " " + genre.name);
    return {
      id: game.id,
      name: game.name,
      image: game.image,
      released: game.released,
      rating: game.rating,
      platform: game.platform,
      genres: genres.toString(),
      createdByDB: true
    }
  })
  return db
};

const getAllGames = async () => {
  let apiInfo = await getApiGames();
  let dbInfo = await getDBGames();
  const AllGames = [...apiInfo, ...dbInfo];
  return AllGames;
};

router.get("/", async (req, res) => {

    const { name } = req.query;
    let allInfo = await getAllGames();

    if (name) {
    const byName = allInfo.filter((game) =>
    game.name.toLowerCase().includes(name.toLowerCase())
    );
    byName.length?
    res.status(200).json(byName.splice(0, 14)):
    res.status(404).json({ msg: 'Game not Found 😕' })

    }else{
    res.status(200).json(allInfo);
    }

  
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      if (id.includes("-")) {
        // detecta la UUID de DB
        const gameDB = await Videogame.findOne({
          where: { id },
          includes: [Genre],
        });
        res.status(200).json(gameDB);
      }else{
        const gameApi = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${Key_Api}`
        );
        const mapeo = gameApi.data
        const platforms = mapeo.platforms.map(platforms => platforms.platform.name);
        const genres = mapeo.genres.map(genre => genre.name);
        const details = {
            id: mapeo.id,
            name: mapeo.name,
            image: mapeo.background_image,
            released: mapeo.released,
            rating: mapeo.rating,
            platform: platforms,
            genres: genres,
            description: mapeo.description_raw,
            }
        res.status(200).json(details);
      }
    }
    else { throw Error }
  } catch (error) {
      res.status(404).json({ error: "Id not found 😕" });
  }
});


router.post("/", async (req, res) => {
    try {
        const {
            name,
            image,
            description,
            released,
            rating,
            genres,
            platform,
          } = req.body;

          let newGame = await Videogame.create({
            name,
            image,
            description,
            released,
            rating: rating || 1,
            platform,
          });
        
          let genreDb = await Genre.findAll({
            where: { name: genres },
          });
        
          newGame.addGenre(genreDb);
        
          res.status(201).send("Video juego creado con exito 👌");
        
    } catch (error) {
        res.status(400).send(error.messagge)
        
    }
  
});

router.put("/", async (req, res) => {
  res.send("put");
});

router.delete("/", async (req, res) => {
  res.send("delete");
});

module.exports = router;
