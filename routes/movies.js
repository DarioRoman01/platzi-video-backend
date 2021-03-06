const express = require('express');
const MoviesService = require('../services/movies');
const validarionHandler = require('../utils/middlewares/validationHandler');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies');

// movies API router
function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  // List all movies
  router.get('/', async (request, reponse, next) => {
    const { tags } = request.query;
    try {
      const movies = await moviesService.getMovies({ tags });
      reponse.status(200).json({
        data: movies,
        message: 'Movies listed',
      });
    } catch (err) {
      next(err);
    }
  });

  // retrieve movie by id
  router.get(
    '/:movieId',
    validarionHandler({ movieId: movieIdSchema }, 'params'),
    async (request, reponse, next) => {
      const { movieId } = request.params;
      try {
        const movie = await moviesService.getMovie({ movieId });
        reponse.status(200).json({
          data: movie,
          message: 'Movie retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Handle movies creation
  router.post(
    '/',
    validarionHandler(createMovieSchema),
    async (request, reponse, next) => {
      const { body: movie } = request;
      try {
        const createdMovieId = await moviesService.createMovie({ movie });
        reponse.status(201).json({
          data: createdMovieId,
          message: 'Movie created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Handle update movies
  router.put(
    '/:movieId',
    validarionHandler({ movieId: movieIdSchema }, 'params'),
    validarionHandler(updateMovieSchema),
    async (request, reponse, next) => {
      const { movieId } = request.params;
      const { body: movie } = request;
      try {
        const updatedMovieid = await moviesService.updateMovie({
          movieId,
          movie,
        });
        reponse.status(200).json({
          data: updatedMovieid,
          message: 'Movie updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // Delte movie by id
  router.delete(
    '/:movieId',
    validarionHandler({ movieId: movieIdSchema }, 'params'),
    async (request, reponse, next) => {
      const { movieId } = request.params;
      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId });
        reponse.status(200).json({
          data: deletedMovieId,
          message: 'Movie deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = moviesApi;