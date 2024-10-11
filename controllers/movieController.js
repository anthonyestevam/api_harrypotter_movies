const Movie = require('../models/Movie');

module.exports = class movieController {
    static async addMovie(req, res) {
        const title = req.body.title;
        const description = req.body.description;
        const whereWatch = req.body.whereWatch;
        const img = req.body.img;

        //validations
        if(!title) return res.status(400).json({message: 'title is required'})
        if(!description) return res.status(400).json({message: 'description is required'})
        if(!whereWatch) return res.status(400).json({message: 'whereWatch is required'})
        if(!img) return res.status(400).json({message: 'img is required'})
        
        const newMovie = new Movie({
            title,
            description,
            whereWatch,
            img
        })
        //Creating new movie
        try {
            const movieSaved = await newMovie.save()
            res.status(201).json(movieSaved)
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    static async getMovies(req, res) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async getMovieById(req, res) {
        const movieId = req.params.id;
        try {
            const movie = await Movie.findById(movieId);

            if (!movie) {
                res.status(404).json({message: 'Movie not found'})
            
            }

            res.status(200).json(movie)
            
        } catch (error) {
            res.status(500).json({message: error.message})
            
        }}

    static async deleteMovie(req, res) {
        const movieId = req.params.id;

        try {
            const movie = await Movie.findByIdAndDelete(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateMovie(req, res) {
        const movieId = req.params.id;
        const { title, description, whereWatch, img } = req.body;

        // validations
        if (!title) return res.status(400).json({ message: 'title is required' });
        if (!description) return res.status(400).json({ message: 'description is required' });
        if (!whereWatch) return res.status(400).json({ message: 'whereWatch is required' });
        if (!img) return res.status(400).json({ message: 'img is required' });

        //updating movie
        try {
            const movie = await Movie.findByIdAndUpdate(
                movieId, 
                { title, description, whereWatch, img }, 
                { new: true } 
            );

            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json(movie); 
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}