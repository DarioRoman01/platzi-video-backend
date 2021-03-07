const assert = require('assert');
const proxyquire = require('proxyquire');
const { getAllStub, MongoLibMock } = require('../utils/mocks/mongLib');
const { moviesMock } = require('../utils/mocks/movies');

describe("Services - movies", () => {
    const MoviesService = proxyquire('../services/movies', {
        '../lib/mongo': MongoLibMock
    })
    const movieService = new MoviesService();
    describe("when movies method is call", async () => {
        it("Should call the get all mongolib method", async () => {
            await movieService.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        });

        it("Should return an array of movies", async () => {
            const result = await movieService.getMovies({});
            const expected = moviesMock;
            assert.deepStrictEqual(result, expected);
        });
    });
});
