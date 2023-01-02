const { Router } = require('express')
const  axios  = require('axios')
const { Genre } = require('../db')
const { Key_Api } = process.env


const router = Router();

// GET https://api.rawg.io/api/genres

const getAllGenres = async (req, res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${Key_Api}`);
    const nameGenres = genresApi.data.results;
    
    nameGenres.forEach((g) => {
        Genre.findOrCreate({
            where: {
                name: g.name,
            }
        })
    });
    const allGenres = await Genre.findAll();
    res.status(200).json(allGenres)
}


router.get('/', getAllGenres);


module.exports = router