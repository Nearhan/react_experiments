/** @jsx React.DOM */

jest.dontMock('../conway');

describe('Conways game of life', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils
    var Conway = require('../conway');

    it('should be able to return grid of size x size', function() {

        var conway = TestUtils.renderIntoDocument(<Conway size="10"/>);

        var cells = TestUtils.scryRenderedDOMComponentsWithClass(conway, 'cell')
        expect(cells.length).toEqual(100);


    });


    it('should be able to start conways game', function() {


    });


});
