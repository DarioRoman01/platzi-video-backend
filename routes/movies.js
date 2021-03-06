const express = require('express');
const MoviesService = require('../services/movies');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();

    router.get('/', async (request, reponse, next) => {
        const { tags } = request.query;
        try {
            const movies = await moviesService.getMovies({ tags });
            reponse.status(200).json({
                data: movies,
                message: 'Movies listed'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/:movieId', async (request, reponse, next) => {
        const { movieId } = request.params;
        try {
            const movie = await moviesService.getMovie({ movieId });

            reponse.status(200).json({
                data: movie,
                message: 'Movie retrieved'
            });
        } catch (err) {
            next(err);
        }
    });

    router.post('/', async (request, reponse, next) => {
        const { body:movie } = request.body;
        try {
            const createdMovieId = await moviesService.createMovie({ movie })
            reponse.status(201).json({
                data: createdMovieId,
                message: 'Movie created'
            });
        } catch (err) {
            next(err);
        }
    });

    router.put('/:movieId', async (request, reponse, next) => {
        const { movieId } = request.params;
        const { body:movie } = request;
        try {
            const updatedMovieid = await moviesService.updateMovie({ movieId, movie })
            reponse.status(200).json({
                data: updatedMovieid,
                message: 'Movie updated'
            });
        } catch (err) {
            next(err);
        }
    });

    router.patch('/:movieId', async (request, response, next) => {
        const { movieId } = request.params;
        const { body:movie } = request
        try {
            const partialUpdatedMovieId = await moviesService.partialUpdateMovie({ movieId, movie })
            response.status(200).json({
                data: partialUpdatedMovieId,
                message: 'Movie partially updated'
            }); 
        } catch(err) {
            next(err);
        }
    })

    router.delete('/:movieId', async (request, reponse, next) => {
        const { movieId } = request.params;
        try {
            const deletedMovieId = await moviesService.deleteMovie({ movieId })
            reponse.status(200).json({
                data: deletedMovieId,
                message: 'Movie deleted'
            });
        } catch (err) {
            next(err);
        }
    });

}

module.exports = moviesApi;