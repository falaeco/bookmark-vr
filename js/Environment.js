/**
 * Handles all the environment elements -> 'Flying Orbs', Birds.
 * :Is called in Core.js
 */

/**
* TODO
*   - Add sounds
*/

class birds {
    constructor(params) {
        this.array = new Array();
        this.counter = 0;
    }

    // Randomly add a new bird with random X Y Z and animate it up to his final position -> Reversed X and Z
    spawn() {
        if (Math.random() > 0.6) {

            // Set random X Y Z positions and Scale
            var tempX = MathUtils.random_posInRange(-100, -50, 50, 100);
            var tempZ = MathUtils.random_posInRange(-100, -50, 50, 100);
            var tempY = MathUtils.map_range(Math.random(), 0, 1, -20, 50);
            var tempScale = MathUtils.map_range(Math.random(), 0, 1, 1, 5);

            // Create a bird element and push it with it's X position
            var bird = {x: tempX, endX: -tempX};
            this.array.push(bird);

            // Append the bird to the scene and add his animation
            $('#main_scene').append('<a-entity id="bird' + this.counter + '" obj-model="obj: #bird-obj;" position="' + tempX + ' ' + tempY + ' ' + tempZ + '" scale="' + tempScale + ' ' + tempScale + ' ' + tempScale + '" rotation="0 0 0" material="emissive: white"></a-entity>');
            $('#bird' + this.counter).append('<a-animation attribute="position" dur="10000" easing="linear" to="' + -tempX + ' ' + tempY + ' ' + -tempZ + '"></a-animation><a-animation attribute="rotation" dur="10000" easing="linear" to="0 3600 0"></a-animation>');

            // Update counters for bird number
            this.counter++;
        }
    }

    // Check if the bird as reached is final position, if so, destroy it.
    update() {

        // Make sure array is not empty
        if (this.array != null) {
            // For each bird ->
            for (let i = 0; i < this.array.length; i++) {
                // Get the bird ->
                var bird = document.querySelector('#bird' + i);
                // Make sure bird still exists ->
                if (bird != null) {
                    // Get X attribute ->
                    var currentX = bird.getAttribute('position').x;
                    // Remove bird from array if X position has reached his final position
                    if (this.array[i].x > 0 && currentX <= this.array[i].endX) {
                        this.array.slice(i, 1);
                        $('#bird' + i).remove();
                    }
                    else if (this.array[i].x < 0 && currentX >= this.array[i].endX) {
                        this.array.slice(i, 1);
                        $('#bird' + i).remove();
                    }
                }
            }
        }
    }
}
var Birds = new birds();

class environment {
    constructor() {
        
    }

    // Initialized the envrionment -> 'Flying Orbs'.
    create() {

        // Spawn Orbs
        for (var i = 0; i < 200; i++) {
            var scale = MathUtils.map_range(Math.random(), 0, 1, 0.1, 0.7);
            var pX = MathUtils.random_posInRange(-70, -10, 10, 70);
            var pY = MathUtils.random_posInRange(-70, -10, 10, 70);
            var pZ = MathUtils.random_posInRange(-70, -10, 10, 70);
            $('#sky').append('<a-entity geometry="primitive: torusKnot; radius: ' + scale + ';" material="emissive: purple; " position="' + pX + ' ' + pY + ' ' + pZ + '"></a-entity>');
        }
        
    }

    // Update birds -> Spawn and destroy.
    update() {

        // Timer -> Handle Birds
        setInterval(function(){ Birds.spawn(); }, 1000);
        setInterval(function(){ Birds.update(); }, 500);

    }
}
var Environment = new environment();