var nodeArray = new Array();

function new_group() {
    var tempName = document.getElementById("group-name").value;
    if (tempName != "") {
        var group = {Name: tempName, Elements: null};
        nodeArray.push(group);
        $('#groups').append('<li onclick="show-elements(this)">' + tempName + '</li>');
        displayNodesGroups();
    }
}