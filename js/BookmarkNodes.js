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
    },

    init: function() {
        var data = this.data;
        var bookmarkEl = this.el;
        var textElement = bookmarkEl.querySelector('.bookmark-text');
        var nodeElement = bookmarkEl.querySelector('.bookmark-node');

        nodeElement.addEventListener('mouseenter', function(){
            console.log('Gaze entered the node');
            $('#info-window > .info-title').html(`${data.title}`);
            $('#info-window > .info-description').html(`${data.description}`);
            $('#info-window').css('visibility', 'visible');
        });

        nodeElement.addEventListener('mouseleave', function(){
            console.log('Gaze left the node');
            $('#info-window').css('visibility', 'hidden');
        });

    }
});

AFRAME.registerComponent('hoverable', {
    schema : {},

    init: function (){
        var el = this.el;

        //temporary duration
        var tempDuration = 300;

        el.setAttribute('animation__scaleUp', {
            property: 'scale',
            startEvents: 'fusing',
            dur: `${tempDuration}`,
            to: '1.6 1.6 1.6'
        });
       el.setAttribute('animation__scaleDown', {
            property: 'scale',
            startEvents: 'mouseleave',
            dur: `${tempDuration}`,
            dir: 'reverse',
            to: '1.6 1.6 1.6'
        });

    }
});






