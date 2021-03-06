const express = require('express');
const { moviesMock } = require('../utils/mocks/movies');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    router.get('/', async (_request, reponse, next) => {
        try {
            const movies = await Promise.resolve(moviesMock);

            reponse.status(200).json({
                data: movies,
                message: 'Movies listed'
            })
        } catch (err) {
            next(err)
        }
    });

    router.get('/:movieId', async (_request, reponse, next) => {
        try {
            const movie = await Promise.resolve(moviesMock[0]);

            reponse.status(200).json({
                data: movie,
                message: 'Movie retrieved'
            })
        } catch (err) {
            next(err)
        }
    });

    router.post('/', async (_request, reponse, next) => {
        try {
            const createdMovieId = await Promise.resolve(moviesMock[0].id);

            reponse.status(201).json({
                data: createdMovieId,
                message: 'Movie created'
            })
        } catch (err) {
            next(err)
        }
    });

    router.put('/:movieId', async (_request, reponse, next) => {
        try {
            const updatedMovieid = await Promise.resolve(moviesMock[0].id);
            reponse.status(200).json({
                data: updatedMovieid,
                message: 'Movie updated'
            })
        } catch (err) {
            next(err)
        }
    });

    router.delete('/:movieId', async (_request, reponse, next) => {
        try {
            const deletedMovieId = await Promise.resolve(moviesMock[0].id);
            reponse.status(200).json({
                data: deletedMovieId,
                message: 'Movie deleted'
            })
        } catch (err) {
            next(err)
        }
    });

}

module.exports = moviesApi;