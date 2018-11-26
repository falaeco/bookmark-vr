for (var i = 0; i < 200; i++) {
    var scale = map_range(Math.random(), 0, 1, 0.1, 0.7);
    var pX = random_posInRange(-70, -10, 10, 70);
    var pY = random_posInRange(-70, -10, 10, 70);
    var pZ = random_posInRange(-70, -10, 10, 70);
    $('#sky').append('<a-entity geometry="primitive: torusKnot; radius: ' + scale + ';" material="emissive: purple; " position="' + pX + ' ' + pY + ' ' + pZ + '"></a-entity>');
}

function displayNodesGroups() {
    $('.group-node').remove();
    nodeArray.forEach(element => {
        $('#main_scene').append('<a-entity class="group-node" geometry="primitive: sphere; radius: 0.3" material="emissive: #6a10e8; color: #6a10e8" position="0 0.1 -5"><a-entity text="value: ' + element.Name + '; align: center; color: black;" scale="5 5 5" position="0 0.5 0"></a-entity><a-animation attribute="position" dur="5000" direction="alternate" easing="ease-in-out" fill="forwards" to="0 -0.1 -5" repeat="indefinite"></a-animation></a-entity>');
    });
}

var birds = new Birds();
var SpawnTimer = setInterval(spawnBirds, 1000);
var TickPerFrame = setInterval(updateBirds, 500);

function spawnBirds() {
    birds.spawn();
}
function updateBirds() {
    birds.update();
}