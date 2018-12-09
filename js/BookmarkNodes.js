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
        var nodeElement = bookmarkEl.querySelector('.bookmark-node');
        var textElement = bookmarkEl.querySelector('.bookmark-text');

        this.setUpHoverAnimation();

        nodeElement.addEventListener('mouseenter', function(){
            console.log('Gaze entered the node');
            $('#info-window > .info-title').html(`${data.title}`);
            $('#info-window > .info-description').html(`${data.description}`);
            $('#info-window > .info-url').html(data.url);
            $('#info-window').css('visibility', 'visible');
            textElement.emit('moveUp');
            bookmarkEl.emit('hovered');
        });

        nodeElement.addEventListener('mouseleave', function(){
            console.log('Gaze left the node');
            $('#info-window').css('visibility', 'hidden');
            textElement.emit('moveDown');
            bookmarkEl.emit('cleared');
        });

        nodeElement.addEventListener('click', function(){
            console.log(`Following url: ${data.url}`);
            window.open(data.url, '_blank');
        });
    },

    setUpHoverAnimation: function() {
        var bookmarkEl = this.el;
        var textElement = this.el.querySelector('.bookmark-text');
        var nodeElement = this.el.querySelector('.bookmark-node');

        var tempDuration = 300;
        var size = 1.6;

        nodeElement.setAttribute('animation__scaleUp', {
            property: 'scale',
            startEvents: 'mouseenter',
            dur: tempDuration,
            to: `${size} ${size} ${size}`
        });

        nodeElement.setAttribute('animation__scaleDown', {
            property: 'scale',
            startEvents: 'mouseleave',
            dur: tempDuration,
            dir: 'reverse',
            to: `${size} ${size} ${size}`
        });

        textElement.setAttribute('animation__moveUp', {
            property: 'position',
            startEvents: 'moveUp',
            dur: tempDuration,
            from: '0 0.8 0',
            to: '0 1.1 0'
        });

        textElement.setAttribute('animation__moveDown', {
            property: 'position',
            startEvents: 'moveDown',
            dur: tempDuration,
            from: '0 1.1 0',
            to: '0 0.8 0'
        });

        bookmarkEl.setAttribute('animation__float', {
            property: 'position',
            dir: 'alternate',
            dur: '2000',
            easing: 'easeInOutSine',
            loop: 'true',
            pauseEvents: 'hovered',
            resumeEvents: 'cleared',
            to: '0 0.2 0'
        });
    }
});






