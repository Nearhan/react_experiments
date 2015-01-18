/**

This will be the game actions
What can you do to games. Think abstract. Start, Stop, Reset,

**/

module.exports = function(GameDispatcher) {



    var GameActions = {

        /**
        @param {event} Event Object passed in by the component
        Triggered with Start is clicked on the Component
        **/
        start: function(e) {
            GameDispatcher.dispatch({
                actionType: 'START'
            });


        },

        /**
        @param {event} Event Object passed in by the component
        Triggered with Reset is clicked on the Component
        **/

        stop: function(e) {
            GameDispatcher.dispatch({
                actionType: 'STOP'
            });
        },

        /**
        @param {event} Event Object passed in by the component
        Triggered with Reset is clicked on the Component
        **/
        reset: function(e) {

            GameDispatcher.dispatch({
                actionType: 'RESET'
            });
        },

        clear: function(e) {

            GameDispatcher.dispatch({
                actionType: 'CLEAR'
            });

        },

        /**
        @param {event} Event Object passed in by the component
        Triggered when draw mode is enabled by the component
        **/
        draw: function(e) {
            GameDispatcher.dispatch({
                actionType: 'DRAW'
            });
        },



        /**
        @param {event} Event Object passed in by the component
        Triggered when cell is in draw mode and is update its state
        **/
        update_cell: function(obj) {
            GameDispatcher.dispatch({
                actionType: 'UPDATE',
                cell: obj
            });
        }

    };

    return GameActions;
}