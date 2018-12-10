/**
 * Contains all the function regarding the bookmark nodes functionalities.
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


/**
 * Inserting new nodes and group
 */
class Bookmark {
    constructor(title, description, url) {
        this.title = title;
        this.description = description;
        this.url = url;
    }
}

class BookmarkGroup {
    constructor(groupName, bookmarkArray = []) {
        this.groupName = groupName;
        this.bookmarkArray = bookmarkArray;
    }
}

class BookmarkNodeManager {
    
    constructor() {
        this.groupList = document.querySelectorAll('.cluster');
    }

    addNewGroup(newGroup) {
        if(this.groupExist(newGroup.groupName)){
            console.log('The group you are trying to add already exists');
            return;
        }

        var sceneElement = document.querySelector('a-scene');
        var newGroupEntity = document.createElement('a-entity');
        newGroupEntity.className = 'cluster';
        newGroupEntity.id = newGroup.groupName;
        newGroupEntity.setAttribute('layout', 'type: line; margin: 1.5');
        newGroupEntity.setAttribute('position', newGroup.position);
        sceneElement.appendChild(newGroupEntity);
        if(newGroup.bookmarkArray){
            newGroup.bookmarkArray.forEach((bookmark) => {
                this.addBookmarkToGroup(bookmark, newGroupEntity.id);
            });
        }
    }

/**
 *  - Add it to the array of groups.
 * 
 */
    addBookmarkToGroup(bookmark, bookmarkGroupName) {
        if(!this.groupExist){
            console.log('Error: The Group does not exist');
            return;
        }
        var newBookmark = document.createElement('a-entity');
        newBookmark.setAttribute('template', 'src: #bookmark-node-template');
        newBookmark.setAttribute('data-title', bookmark.title);
        newBookmark.setAttribute('data-description', bookmark.description);
        newBookmark.setAttribute('data-url', bookmark.url);

        //bookmarkGroup.bookmarkArray.push(bookmark);
        document.querySelector(`#${bookmarkGroupName}`).appendChild(newBookmark);
    }

    groupExist(groupName) {
        this.groupList.forEach((item) => {
            if(item.id === groupName) return true;
        });
        return false;
    }
    
}

/* TEST */
 $(document).ready(() => {
    var bookmarkManager = new BookmarkNodeManager();
    bookmarkManager.addBookmarkToGroup(
        new Bookmark(
            'Tumblr', 
            "Tumblr is a place to express yourself, discover yourself, and bond over the stuff you love. It's where your interests connect you with your people.",
            "https://www.tumblr.com/"), 'cluster1');

    var myBookmarkGroup = [
            {
                groupName: 'cluster2' ,
                position: '1 1.5 1',
                bookmarkArray: [
                    {
                        title: 'Concordia University',
                        description: "Concordia University, located in the vibrant and cosmopolitan city of Montreal, Quebec, is one of Canada's most innovative and diverse, comprehensive",
                        url: 'https://www.concordia.ca/'
                    },
                    {
                        title: 'Bee - Wikipedia',
                        description: 'Bees are flying insects closely related to wasps and ants, known for their role in pollination and, in the case of the best-known bee species, the western honey ...',
                        url: 'https://en.wikipedia.org/wiki/Bee'
                    }
                ]
            },
            {
                groupName: 'cluster3',
                position: '-1 -1.5 1',
                bookmarkArray: [
                    {
                        title: 'YouTube',
                        description: 'Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube',
                        url: 'https://www.youtube.com/'
                    },
                    {
                        title: 'Vimeo',
                        description:"Join the web's most supportive community of creators and get high-quality tools for hosting, sharing, and streaming videos in gorgeous HD and 4K with no ads.",
                        url: 'https://vimeo.com/'
                    }
                ]
            }
    ]
    myBookmarkGroup.forEach((group) => {
        bookmarkManager.addNewGroup(group);
    });
 });


