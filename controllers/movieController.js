const Movie = require('../models/Movie');

module.exports = class movieController {
    static async addMovie(req, res) {
        const { title, description, whereWatch, img } = req.body;

        if (!title || !description || !whereWatch || !img) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newMovie = new Movie({ title, description, whereWatch, img });

        try {
            const movieSaved = await newMovie.save();
            res.status(201).json({
                movie: movieSaved,
                _links: {
                    self: { href: `/movies/${movieSaved._id}` },
                    list: { href: `/movies` },
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getMovies(req, res) {
        try {
            const movies = await Movie.find();
            res.status(200).json({
                movies,
                _links: {
                    self: { href: `/movies` }
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getMovieById(req, res) {
        const movieId = req.params.id;

        try {
            const movie = await Movie.findById(movieId);

            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json({
                movie,
                _links: {
                    self: { href: `/movies/${movieId}` },
                    list: { href: `/movies` },
                    delete: { href: `/movies/${movieId}`, method: "DELETE" },
                    update: { href: `/movies/${movieId}`, method: "PUT" }
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteMovie(req, res) {
        const movieId = req.params.id;

        try {
            const movie = await Movie.findByIdAndDelete(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json({
                message: 'Movie deleted successfully',
                _links: {
                    list: { href: `/movies` }
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateMovie(req, res) {
        const movieId = req.params.id;
        const { title, description, whereWatch, img } = req.body;

        if (!title || !description || !whereWatch || !img) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const movie = await Movie.findByIdAndUpdate(movieId, { title, description, whereWatch, img }, { new: true });

            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            res.status(200).json({
                movie,
                _links: {
                    self: { href: `/movies/${movieId}` },
                    list: { href: `/movies` },
                    delete: { href: `/movies/${movieId}`, method: "DELETE" }
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
