const Movie = require('../models/Movie');
const movieController = require('../controllers/movieController');

jest.mock('../models/Movie');

describe('movieController', () => {

    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('addMovie', () => {
        it('should return 400 if title is missing', async () => {
            req.body = { description: 'desc', whereWatch: 'Netflix', img: 'image.jpg' };
            await movieController.addMovie(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'title is required' });
        });

        it('should save the movie and return 201 status', async () => {
            req.body = { title: 'Movie 1', description: 'desc', whereWatch: 'Netflix', img: 'image.jpg' };
            const savedMovie = { title: 'Movie 1', description: 'desc' };
            Movie.prototype.save = jest.fn().mockResolvedValue(savedMovie);

            await movieController.addMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedMovie);
        });

        it('should return 500 if an error occurs during saving', async () => {
            req.body = { title: 'Movie 1', description: 'desc', whereWatch: 'Netflix', img: 'image.jpg' };
            Movie.prototype.save = jest.fn().mockRejectedValue(new Error('Save failed'));

            await movieController.addMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Save failed' });
        });
    });

    describe('getMovies', () => {
        it('should return all movies', async () => {
            const movies = [{ title: 'Movie 1' }, { title: 'Movie 2' }];
            Movie.find.mockResolvedValue(movies);

            await movieController.getMovies(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(movies);
        });

        it('should return 500 if an error occurs', async () => {
            Movie.find.mockRejectedValue(new Error('Find failed'));

            await movieController.getMovies(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Find failed' });
        });
    });

    describe('getMovieById', () => {
        it('should return the movie if found', async () => {
            const movie = { title: 'Movie 1' };
            req.params.id = 'validId';
            Movie.findById.mockResolvedValue(movie);

            await movieController.getMovieById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(movie);
        });

        it('should return 404 if movie is not found', async () => {
            req.params.id = 'invalidId';
            Movie.findById.mockResolvedValue(null);

            await movieController.getMovieById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
        });

        it('should return 500 if an error occurs', async () => {
            req.params.id = 'validId';
            Movie.findById.mockRejectedValue(new Error('Find failed'));

            await movieController.getMovieById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Find failed' });
        });
    });

    describe('deleteMovie', () => {
        it('should delete the movie and return 200', async () => {
            req.params.id = 'validId';
            Movie.findByIdAndDelete.mockResolvedValue({ title: 'Movie 1' });

            await movieController.deleteMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Movie deleted successfully' });
        });

        it('should return 404 if movie is not found', async () => {
            req.params.id = 'invalidId';
            Movie.findByIdAndDelete.mockResolvedValue(null);

            await movieController.deleteMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
        });

        it('should return 500 if an error occurs', async () => {
            req.params.id = 'validId';
            Movie.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'));

            await movieController.deleteMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Delete failed' });
        });
    });

    describe('updateMovie', () => {
        it('should return 400 if required fields are missing', async () => {
            req.params.id = 'validId';
            req.body = { title: '', description: '', whereWatch: '', img: '' };

            await movieController.updateMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'title is required' });
        });

        it('should update the movie and return 200', async () => {
            req.params.id = 'validId';
            req.body = { title: 'Updated Title', description: 'Updated Desc', whereWatch: 'Netflix', img: 'img.jpg' };
            const updatedMovie = { title: 'Updated Title' };
            Movie.findByIdAndUpdate.mockResolvedValue(updatedMovie);

            await movieController.updateMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedMovie);
        });

        it('should return 404 if movie is not found', async () => {
            req.params.id = 'invalidId';
            req.body = { title: 'Updated Title', description: 'Updated Desc', whereWatch: 'Netflix', img: 'img.jpg' };
            Movie.findByIdAndUpdate.mockResolvedValue(null);

            await movieController.updateMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Movie not found' });
        });

        it('should return 500 if an error occurs', async () => {
            req.params.id = 'validId';
            req.body = { title: 'Updated Title', description: 'Updated Desc', whereWatch: 'Netflix', img: 'img.jpg' };
            Movie.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'));

            await movieController.updateMovie(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Update failed' });
        });
    });
});
