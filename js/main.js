for (var i = 0; i < 200; i++) {
    var scale = map_range(Math.random(), 0, 1, 0.1, 0.7);
    var pX = random_posInRange(-70, -10, 10, 70);
    var pY = random_posInRange(-70, -10, 10, 70);
    var pZ = random_posInRange(-70, -10, 10, 70);
    $('#sky').append('<a-entity geometry="primitive: torusKnot; radius: ' + scale + ';" material="emissive: purple; " position="' + pX + ' ' + pY + ' ' + pZ + '"></a-entity>');
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