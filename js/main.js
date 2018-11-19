var landscape = document.querySelector('#landscape');

for (var i = 0; i < 300; i++) {
    var treeNbr = Math.round(map_range(Math.random(), 0, 1, 1, 3));
    var scale = map_range(Math.random(), 0, 1, 1, 3);
    var pX = map_range(Math.random(), 0, 1, -25, 25);
    var pY = map_range(Math.random(), 0, 1, -25, 25);
    var pZ = map_range(Math.random(), 0, 1, 4, 6);
    $('#landscape').append('<a-entity obj-model="obj: #tree'+ treeNbr +'-obj; mtl: #tree'+ treeNbr +'-mtl" rotation="90 0 0" scale="'+ scale +' '+ scale +' '+ scale +'" position="'+ pX +' '+ pY +' '+ pZ +'"></a-entity>');
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}