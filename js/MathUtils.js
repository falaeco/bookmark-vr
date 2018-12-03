/**
 * Contains all general mathematical/algeometrical functions.
 */

class math_utils {
    constructor() {

    }

    // Scale a value to desired range
    map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    // Return a random value in range
    random_posInRange(start1, end1, start2, end2) {
        if (Math.random() > 0.5) {
            return this.map_range(Math.random(), 0, 1, start1, end1);
        }
        else {
            return this.map_range(Math.random(), 0, 1, start2, end2);
        }
    }
}
var MathUtils = new math_utils();