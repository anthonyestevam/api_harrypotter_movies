const router = require('express').Router();

const movieController = require('../controllers/movieController');

router.post('/addmovie', movieController.addMovie);
router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.delete('/delete/:id', movieController.deleteMovie);
router.put('/update/:id', movieController.updateMovie);

module.exports = router;

