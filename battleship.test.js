const { Ship } = require('./battleship');
const { Gameboard } = require('./gameboard');


const ship1 = Ship([[1, 1], [1,2]]);

test('takes a position and records that position if hit', () => {
    ship1.hit([1, 1]);
    expect(ship1.damage[0]).toEqual([1,1]);
});

test('takes a position and does not record that position if not hit', () => {
    ship1.hit([1,3]);
    expect(ship1.damage).not.toEqual([1,3]);
});

test('show ship to be sunk if all positions are hit', () => {
    ship1.hit([1,2]);
    expect(ship1.isSunk()).toBe(true);
});

const ship2 = Ship([[2,2],[2,3]]);

test('show ship to be not sunk if all positions are not hit', () => {
    ship2.hit([2,2]);
    expect(ship2.isSunk()).toBe(false);
});

const gameboard = Gameboard(5);
test('place ships at specific coordinates', () => {
    gameboard.placeShips([[1, 3],[1,4]]);
    expect(gameboard.ships[0].position).toEqual(Ship([[1, 3], [1, 4]]).position);
});

test('all ships to be sunk if all coordinates are hit', () => {
    gameboard.placeShips([[2, 3], [2, 4]]);
    gameboard.receiveAttack([1, 3]);
    gameboard.receiveAttack([1, 4]);
    gameboard.receiveAttack([2, 3]);
    gameboard.receiveAttack([2, 4]);

    expect(gameboard.allSunk()).toBe(true);
});