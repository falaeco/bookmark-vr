/**
 * Handle the group panel and planning events.
 */
class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidInputError';
    }
}

class GroupManager {
    constructor() {
        this.groups = new Array();
        this.bookmarkNodeManager = new BookmarkNodeManager();
    }

    // Create a new group and push it into group array
    create() {

        try {
            // Get value from text input ->
            var tempTitle = document.getElementById("title").value;

            // Check If value is null
            if (tempTitle.trim() === "") {
                throw new InvalidInputError('You need to enter a name');
            }

            // Check if it already exists
            this.groups.forEach(element => {
                if (element.Title === tempTitle) {
                    throw new InvalidInputError('That group already exists');
                }
            });

            // Create a group element and push it
            var newGroup = new BookmarkGroup(tempTitle);
            this.groups.push(newGroup);
            // Append HTML list
            $('#groups').append('<li class="flex_center" onclick="Group.show(this)">' + tempTitle + '</li>');

            this.bookmarkNodeManager.addNewGroup(newGroup);
        } catch(err) {
            return alert('Invalid Input: ' + err.message);
        } finally {
            document.getElementById("title").value = "";
        }
    }

    // Display a group title and elements
    show(group) {

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
        var tempIndex = this.groups.findIndex(group => group.groupName == tempTitle);

        // Clear planning screen
        $('.element-container').remove();

        // Make sure element array is not null ->
        if (this.groups[tempIndex].length != 0) {
            // Add elements to planning screen
            for (let i = 0; i < this.groups[tempIndex].length; i++) {
                const element = this.groups[tempIndex];
                $('.group-elements').append('<article id="' + i + '" class="element-container"><input id="name" class="element-name element-input" type="text" value="' + element.title + '" onchange="Group.change(this)"></input><input id="url" class="element-url element-input" type="text" value="' + element.url + '" onchange="Group.change(this)"></input><input id="desc" class="element-desc element-input" type="text" value="' + element.description + '" onchange="Group.change(this)"></input><input type="file" id="image" name="file-picker" accept="image/png, image/jpeg" style="display: none" onchange="Group.change(this)"></input><input id="img" class="element-img" type="image" id="image" alt="thumbnail" src="' + element.Source + '" onclick="Group.picker();"></input></article>');
            }
        }

        // Create a null element
        $('.group-elements').append('<article class="element-container"><input id="name" class="element-name element-input" type="text" value="Name Here" onchange="Group.change(this)"></input><input id="url" class="element-url element-input" type="text" value="Url Here" onchange="Group.change(this)"></input><input id="desc" class="element-desc element-input" type="text" value="Description Here" onchange="Group.change(this)"></input><input type="file" id="image" name="file-picker" accept="image/png, image/jpeg" style="display: none" onchange="Group.change(this)"></input><input id="img" class="element-img" type="image" id="image" alt="thumbnail" src="./assets/logo.png" onclick="Group.picker();"></input></article>');
    }

    // Change a group element
    change(element) {

        // Get group title
        var tempTitle = document.getElementById("group-title").innerHTML;

        // Get parent id
        var tempId = element.parentElement.id;
        // Get array index
        var tempIndex = this.groups.findIndex(group => group.title == tempTitle);

        // Check if element already exists
        if (tempId != "") {
            // Get input type
            if (element.id == "name") {
                this.groups[tempIndex].title = element.value;
            } else if (element.id == "url") {
                this.groups[tempIndex].url = element.value;
            } else if (element.id == "desc") {
                this.groups[tempIndex].description = element.value;
            }
        } else {
            // Get input type
            if (element.id == "name") {
                var temp = {
                    title: element.value,
                    url: "Url Here",
                    description: "Description Here"
                };
                this.groups.push(temp);
            } else if (element.id == "url") {
                var temp = {
                    title: "Name Here",
                    url: element.value,
                    description: "Description Here"
                };
                this.groups.push(temp);
            } else if (element.id == "desc") {
                var temp = {
                    title: "Name Here",
                    url: "Url Here",
                    description: element.value
                };
                this.groups.push(temp);
            } else if (element.id == "image") {
                var temp = {
                    title: "Name Here",
                    url: "Url Here",
                    description: "Description Here"
                };
                this.groups.push(temp);
            }
        }

        // Reset planning
        this.show(tempTitle);
    }

    // Open file picker
    picker() {
        $("#image").click();
    }
}
var Group = new GroupManager();