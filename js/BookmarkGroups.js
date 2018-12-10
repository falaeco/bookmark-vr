/**
 * Handle the group panel and planning events.
 */

class group {
    constructor() {
        this.groups = new Array();
    }

    // Create a new group and push it into group array
    create() {

        // Get value from text input ->
        var tempTitle = document.getElementById("title").value;

        // If value is null
        if (tempTitle == "") {
            return alert("Please insert a name.");
        }
        // If group already exists
        var tempExists = false;
        this.groups.forEach(element => {
            if (element.Title == tempTitle) {
                tempExists = true;
                return alert("Group already exists.");
            }
        });

        // If group does not exist
        if (tempExists != true) {

            // Create a group element and push it
            var group = {
                Title: tempTitle,
                Elements: [],
            };
            this.groups.push(group);

            // Append HTML list
            $('#groups').append('<li class="flex_center" onclick="Group.show(this)">' + tempTitle + '</li>');

            // Remove text from text input
            document.getElementById("title").value = "";

            // HERE IS WHERE THE NODES SHOULD BE UPDATED!
            // UPDATE NODES
        }
        // Remove text from text input
        else {
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
        var tempIndex = this.groups.findIndex(group => group.Title == tempTitle);

        // Clear planning screen
        $('.element-container').remove();

        // Make sure element array is not null ->
        if (this.groups[tempIndex].Elements.length != 0) {
            // Add elements to planning screen
            for (let i = 0; i < this.groups[tempIndex].Elements.length; i++) {
                const element = this.groups[tempIndex].Elements[i];
                $('.group-elements').append('<article id="' + i + '" class="element-container"><input id="name" class="element-name element-input" type="text" value="' + element.Name + '" onchange="Group.change(this)"></input><input id="url" class="element-url element-input" type="text" value="' + element.Url + '" onchange="Group.change(this)"></input><input id="desc" class="element-desc element-input" type="text" value="' + element.Desc + '" onchange="Group.change(this)"></input><input type="file" id="image" name="file-picker" accept="image/png, image/jpeg" style="display: none" webkitdirectory directory onchange="Group.change(this)"></input><input id="img" class="element-img" type="image" id="image" alt="thumbnail" src="' + element.Source + '" onclick="Group.picker();"></input></article>');
            }
        }

        // Create a null element
        $('.group-elements').append('<article class="element-container"><input id="name" class="element-name element-input" type="text" value="Name Here" onchange="Group.change(this)"></input><input id="url" class="element-url element-input" type="text" value="Url Here" onchange="Group.change(this)"></input><input id="desc" class="element-desc element-input" type="text" value="Description Here" onchange="Group.change(this)"></input><input type="file" id="image" name="file-picker" accept="image/png, image/jpeg" style="display: none" webkitdirectory directory onchange="Group.change(this)"></input><input id="img" class="element-img" type="image" id="image" alt="thumbnail" src="./assets/logo.png" onclick="Group.picker();"></input></article>');
    }

    // Change a group element
    change(element) {
        console.log(element.files);

        // Get group title
        var tempTitle = document.getElementById("group-title").innerHTML;

        // Get parent id
        var tempId = element.parentElement.id;
        // Get array index
        var tempIndex = this.groups.findIndex(group => group.Title == tempTitle);

        // Check if element already exists
        if (tempId != "") {
            // Get input type
            if (element.id == "name") {
                this.groups[tempIndex].Elements[tempId].Name = element.value;
            } else if (element.id == "url") {
                this.groups[tempIndex].Elements[tempId].Url = element.value;
            } else if (element.id == "desc") {
                this.groups[tempIndex].Elements[tempId].Desc = element.value;
            } else if (element.id == "image") {
                this.groups[tempIndex].Elements[tempId].Source = "./assets/logo.png";
            }
        } else {
            // Get input type
            if (element.id == "name") {
                var temp = {
                    Name: element.value,
                    Url: "Url Here",
                    Desc: "Description Here",
                    Source: "./assets/logo.png"
                };
                this.groups[tempIndex].Elements.push(temp);
            } else if (element.id == "url") {
                var temp = {
                    Name: "Name Here",
                    Url: element.value,
                    Desc: "Description Here",
                    Source: "./assets/logo.png"
                };
                this.groups[tempIndex].Elements.push(temp);
            } else if (element.id == "desc") {
                var temp = {
                    Name: "Name Here",
                    Url: "Url Here",
                    Desc: element.value,
                    Source: "./assets/logo.png"
                };
                this.groups[tempIndex].Elements.push(temp);
            } else if (element.id == "image") {
                var temp = {
                    Name: "Name Here",
                    Url: "Url Here",
                    Desc: "Description Here",
                    Source: "./assets/logo.png"
                };
                this.groups[tempIndex].Elements.push(temp);
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
var Group = new group();