class Birds {
    constructor(params) {
        this.array = new Array();
        this.counter = 0;
    }

    spawn() {
        if (Math.random() > 0.50) {
            var tempX = random_posInRange(-100, -50, 50, 100);
            var tempZ = random_posInRange(-100, -50, 50, 100);
            this.array.push(new Bird(tempX, tempZ));
            var tempY = map_range(Math.random(), 0, 1, -20, 50);
            var tempScale = map_range(Math.random(), 0, 1, 1, 5);
            var rotateY = get_rotation(-tempX, -tempZ);
            $('#main_scene').append('<a-entity id="bird' + this.counter + '" obj-model="obj: #bird-obj;" position="' + tempX + ' ' + tempY + ' ' + tempZ + '" scale="' + tempScale + ' ' + tempScale + ' ' + tempScale + '" rotation="0 ' + rotateY + ' 0" material="emissive: white"></a-entity>');
            $('#bird' + this.counter).append('<a-animation attribute="position" dur="50000" easing="linear" to="' + -tempX + ' ' + tempY + ' ' + -tempZ + '"></a-animation>')
            this.counter++;
        }
    }

    update() {
        if (this.array != null) {
            for (let i = 0; i < this.array.length; i++) {
                var bird = document.querySelector('#bird' + i);
                if (bird != null) {
                    var currentX = bird.getAttribute('position').x;
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

function Bird(x) {
    this.x = x;
    this.endX = -x;
}