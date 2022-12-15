const { Router } = require('express')
const axios = require('axios');
const { Videogame, Genre, Platform} = require("../db");
const { Key_Api } = process.env;


const router = Router();

// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
// ?key=21ed8a1220d7428a83c19eceb04229a2

const getApiGames = async () => {
    const api = await axios.get(`https://api.rawg.io/api/games?key=${Key_Api}&page=1`)
    const api2 = await axios.get(`https://api.rawg.io/api/games?key=${Key_Api}&page=2`)
    const api3 = await axios.get(`https://api.rawg.io/api/games?key=${Key_Api}&page=3`)
    const api4 = await axios.get(`https://api.rawg.io/api/games?key=${Key_Api}&page=4`)
    const api5 = await axios.get(`https://api.rawg.io/api/games?key=${Key_Api}&page=5`)
  
     allApi = api.data.results.concat(
      api2.data.results,
      api3.data.results,
      api4.data.results,
      api5.data.results
      )
    let apiInfo = allApi.map((game) => {
      const platform = game.platforms.map(g => g.platform)
        return {
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres: game.genres,
            platforms: platform,
            rating: game.rating,
            released: game.released,
            // description: game.description,
      };
    });
    return apiInfo;
};

const getDBGames = async () => {
return await Videogame.findAll({include: [Genre, Platform]})
}

const getAllGames = async () => {
let apiInfo = await getApiGames()
let dbInfo = await getDBGames()
const AllGames = [...apiInfo, ...dbInfo]
return AllGames
}


router.get('/', async( req, res )=>{
    const { name } = req.query;
    let AllInfo = await getAllGames();
        if (name) {
          const byName = AllInfo.filter((game) =>
            game.name.toLowerCase().includes(name.toLowerCase())
     );
            byName.length ?
            res.status(200).json(byName.splice(0, 14)):
            res.status(404).send({ msg: 'Game not Found 😕' });
        } else {
            res.status(200).json(AllInfo);
      
        }
    });

router.get('/:id', async( req, res )=>{
    const { id } = req.params
    if (id){
        if (id.includes("-")){// detecta la UUID de DB
            const gameDB = await Videogame.findOne({
                where:{id},
                includes: [Genre, Platform]
            });
            res.status(200).json(gameDB);
        }
        const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${Key_Api}`)
        res.status(200).json(gameApi.data)
    }else{
        res.status(404).json({error: 'Id not found 😕'});
    }

})

router.post('/', async( req, res) =>{
    const{ name, image, description, released, rating, genres, platforms, createInDb} = req.body;
    let newGame = await Videogame.create({
        name,
        image,
        description,
        released,
        rating: rating || 1,
        createInDb
    })

    let genreDb = await Genre.findAll({
        where: {name : genres}
    })

    let platformDb = await Platform.findAll({
        where: {name: platforms}
    });

    newGame.addGenres(genreDb);
    newGame.addPlatforms(platformDb);

    res.status(200).send('Video juego creado con exito 👌');
});    




module.exports = router