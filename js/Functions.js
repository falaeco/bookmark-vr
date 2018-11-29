function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function random_posInRange(start1, end1, start2, end2) {
    if (Math.random() > 0.5) {
        return map_range(Math.random(), 0, 1, start1, end1);
    }
    else {
        return map_range(Math.random(), 0, 1, start2, end2);
    }
}

function get_rotation(x, z) {
    var hyp = Math.sqrt((x * x) + (z * z));
    var angle = Math.acos(x / hyp);
    return -angle;
}

function node_distribute(arrayLenght) {
    
}