/**
 * Handle the group panel and planning events.
 */

/**
 * TODO
 *  - Add a section to visualize the items of the group
 *  - Add a function to update and show nodes in canvas
 *  - Improve css
 */

class group {
    constructor() {
        this.groups = new Array();
    }

    // Create a new group and push it into group array
    create() {

        // Get value from text input ->
        var tempName = document.getElementById("group-name").value;

        // If value is null
        if (tempName == "") {
            return alert("Please insert a name.");
        }
        // If group already exists
        var tempExists = false;
        this.groups.forEach(element => {
            if (element.Name == tempName) {
                tempExists = true;
                return alert("Group already exists.");
            }
        });

        // If group does not exist
        if (tempExists != true) {

            // Create a group element and push it
            var group = {
            Name: tempName,
            Elements: null
            };
            this.groups.push(group);

            // Append HTML list
            $('#groups').append('<li onclick="Group.show(this)">' + tempName + '</li>');

            // Remove text from text input
            document.getElementById("group-name").value = "";

            // HERE IS WHERE THE NODES SHOULD BE UPDATED!
            // UPDATE NODES
        }
        // Remove text from tex input
        else {document.getElementById("group-name").value = "";}
    }

    // Display a group name and elements
    show() {
        
    }
}
var Group = new group();