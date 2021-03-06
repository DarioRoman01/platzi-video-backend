const { moviesMock } = require('../utils/mocks/movies')

class MoviesService {
    async getMovies() {
        const movies = await Promise.resolve(moviesMock);
        return movies || [];
    }

    async getMovie() {
        const movie = await Promise.resolve(moviesMock[0]);
        return movie || {};
    }

    async createMovie() {
        const createdMovieId = await Promise.resolve(moviesMock[0].id);
        return createdMovieId;
    }

    async updateMovie() {
        const updatedMovieId = await Promise.resolve(moviesMock[0].id);
        return updatedMovieId;
    }

    async partialUpdateMovie() {
        const partialUpdateMovie = await Promise.resolve(moviesMock[0].id)
        return partialUpdateMovie;
    }

    async deleteMovie() {
        const deltedMovieid =  await Promise.resolve(moviesMock[0].id);
        return deltedMovieid;
    }
}

module.exports = MoviesService;