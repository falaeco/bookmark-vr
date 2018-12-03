/**
 * Contains all the function regarding the bookmark nodes functionalities.
 */

/**
 * TODO: 
 *  - [X] Generate Bookmark Nodes components on the map
 *  - [ ] Create a on hover event
 *  
 * Useful information:
 * A-Frame can trigger custom event with the emit() function
 * 
 */

/**
 * Bookmark node that contains all the information of the node and the 
 * appearance of the node in the VR space.
 */
AFRAME.registerComponent('bookmark', {
    schema: {
        title: {type: 'string', default: 'Untitled'},
        description: {type: 'string', default: 'No description...'},
        url: {type: 'string', default: 'about:blank'},
        //add a thumbnail?
        animDuration: {type: 'number', default: '300'}
    },

    init: function() {
        var data = this.data;
        var el = this.el;

        el.addEventListener('mouseenter', function() {
            el.emit()
        })
    },

    /**
     * Set up scale animation with the animation component
     */
    scaleOnHover: function() {
        var data = this.data;
        var el = this.el;
    }
});

/*
Panels showing the information of the bookmark node
AFRAME.regiterComponent('bookmark-information', {

})
*/



