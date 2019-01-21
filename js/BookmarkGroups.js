/**
 * Handle the group panel and planning events.
 * TODO: 
 *  - Update Node function (or refactor the change function)
 *      Idea: With a form? and action.
 *  - Create a new node function
 *  - Still need to connect groupmanager and bookmarknode manager
 */
class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidInputError';
    }
}

class GroupManager {
    constructor() {
        this.groupArray = new Array();
        this.bookmarkNodeManager = new BookmarkNodeManager();
    }

    // Create a new group and push it into group array
    createGroup() {

        try {
            // Get value from text input ->
            var tempTitle = document.getElementById("title").value.trim();

            // Check If value is null
            if (tempTitle.trim() === "") {
                throw new InvalidInputError('You need to enter a name');
            }

            // Check if it already exists
            this.groupArray.forEach(element => {
                if (element.groupName === tempTitle) {
                    throw new InvalidInputError('That group already exists');
                }
            });

            // Create a group element and push it
            var newGroup = new BookmarkGroup(tempTitle);
            this.groupArray.push(newGroup);
            // Append HTML list
            $('#groupList').append('<li class="group-list-element" onclick="Group.showGroup(this)">' + tempTitle + '</li>');

            this.bookmarkNodeManager.addNewGroup(newGroup);

        } catch(err) {
            return alert('Invalid Input: ' + err.message);
        } finally {
            document.getElementById("title").value = "";
        }
    }

    // Display a group title and elements
    showGroup(group) {

        // Get group title ->
        if (group.innerHTML != null) {
            var tempTitle = group.innerHTML;
        }
        else {
            var tempTitle = group;
        }

        // Set group title
        document.getElementById("group-title").innerHTML = tempTitle;

        // Get array index
        var tempIndex = this.groupArray.findIndex(group => group.groupName == tempTitle);

        // Clear planning screen
        $('.element-container').remove();

        // Make sure element array is not null ->
        if (this.groupArray[tempIndex].length != 0) {
            // Add elements to planning screen
            for (let i = 0; i < this.groupArray[tempIndex].length; i++) {
                const element = this.groupArray[tempIndex];
                $('.group-elements').append(
                    '<article id="' + i + '" class="element-container">'+
                        '<h2 class="element-name element-input" type="text" value="' + element.title + '" onchange="Group.change(this)">'+
                        '<input id="url" class="element-url element-input" type="text" value="' + element.url + '" onchange="Group.change(this)">'+
                        '<input id="desc" class="element-desc element-input" type="text" value="' + element.description + '" onchange="Group.change(this)"></input>'+
                    '</article>');
            }
        }

        // Create a null element
        /*
        $('.group-elements').append('<article class="element-container"><input id="name" class="element-name element-input" type="text" value="Name Here" onchange="Group.change(this)"></input><input id="url" class="element-url element-input" type="text" value="Url Here" onchange="Group.change(this)"></input><input id="desc" class="element-desc element-input" type="text" value="Description Here" onchange="Group.change(this)"></input><input type="file" id="image" name="file-picker" accept="image/png, image/jpeg" style="display: none" onchange="Group.change(this)"></input></article>');
        */
    }

    // Change a group element 
    change(element) {

        // Get group title
        var tempTitle = document.getElementById("group-title").innerHTML;

        // Get parent id
        var tempId = element.parentElement.id;
        // Get array index
        var tempIndex = this.groupArray.findIndex(group => group.title == tempTitle);

        // Check if element already exists
        if (tempId != "") {
            // Get input type
            if (element.id == "name") {
                this.groupArray[tempIndex].title = element.value;
            } else if (element.id == "url") {
                this.groupArray[tempIndex].url = element.value;
            } else if (element.id == "desc") {
                this.groupArray[tempIndex].description = element.value;
            }
        } else {
            // Get input type
            if (element.id == "name") {
                var temp = {
                    title: element.value,
                    url: "Url Here",
                    description: "Description Here"
                };
                this.groupArray.push(temp);
            } else if (element.id == "url") {
                var temp = {
                    title: "Name Here",
                    url: element.value,
                    description: "Description Here"
                };
                this.groupArray.push(temp);
            } else if (element.id == "desc") {
                var temp = {
                    title: "Name Here",
                    url: "Url Here",
                    description: element.value
                };
                this.groupArray.push(temp);
            } else if (element.id == "image") {
                var temp = {
                    title: "Name Here",
                    url: "Url Here",
                    description: "Description Here"
                };
                this.groupArray.push(temp);
            }
        }

        // Reset planning
        this.showGroup(tempTitle);
    }

    // Open file picker
    picker() {
        $("#image").click();
    }
}
var Group = new GroupManager();