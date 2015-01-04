

jest.dontMock('../ConwayStore');



describe('Conway Game Behavior Tests', function() {

    var GameStore = require('../ConwayStore')


    it('Should be able to Start', function() {

        var game = new GameStore()
        game.start();

        expect(game.running).toBe(true)



    });

    it('Should be able to Init Cells', function() {

        var game = new GameStore(10)
        game.start();
        expect(game.totalCells).toBe(100)

    });




});