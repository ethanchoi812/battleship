
const Ship = (pos) => {
    
    const position = pos; // array of coords e.g. [[0, 1], [0, 2]] => [0][1], [0][2]
    const damage = []; // array of coords from hit()

    /**
     * 
     * @param {arr} coord e.g [1, 1]
     */
    const hit = (coord) => {
        for (subarr of position){
            if (subarr[0] === coord[0] && subarr[1] === coord[1]){
                damage.push(coord);
            } 
        }
    }

    const isSunk = () => {
        if (position.length === damage.length){
            return true
        } else {
            return false;
        }
    }

    return { position, damage, hit, isSunk }
}

module.exports = { Ship }
