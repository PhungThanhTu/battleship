import { Color } from "../../utils/color";
import { Cell } from "../cell/cell";
import { Ship } from "../ship/ship";

const ShipPlaceOptions: ShipsToBePlacedRandomLy = {
    ships: [
        {
            size: 4,
            color: Color.Purple
        },
        {
            size: 5,
            color: Color.Red
        },
        {
            size: 2,
            color: Color.Green
        },
        {
            size: 3,
            color: Color.Blue
        },
        {
            size: 3,
            color: Color.Navy
        }
    ]
};

const BOARD_SIZE = 10;

export function createBoard(matrix?: Cell[][]) {
    const board = new Board(matrix);
    if (!matrix) board.placeRandomShips(ShipPlaceOptions);
    return board;
}

export class Board {
    private matrix: Cell[][];
    private ships: Ship[];
    private shipCount: number;

    constructor(maxtrix?: Cell[][]) {
        this.matrix = maxtrix ?? [];
        if (!maxtrix) {
            for (let row = 0; row < BOARD_SIZE; row++) {
                let newRow = [];
                for (let col = 0; col < BOARD_SIZE; col++) {
                    const newCell = new Cell();
                    newRow.push(newCell);
                }
                this.matrix.push(newRow);
            }
        }

        this.ships = [];
        this.shipCount = 0;
    }

    placeShips(ships: Ship[]) {
        this.ships = ships;
        this.shipCount = ships.length;
    }

    getMatrix() {
        return this.matrix;
    }

    getWidth() {
        return this.matrix[0].length;
    }

    getHeight() {
        return this.matrix.length;
    }

    shoot(pos: MatrixPosition) {
        this.getCell(pos).shoot();
        this.shipCount = this.ships.filter((ship) => !ship.isDead()).length;
    }

    getShipCount() {
        return this.shipCount;
    }

    getShip(pos: MatrixPosition) {
        return this.getCell(pos).getShip();
    }

    placeRandomShips({ ships }: ShipsToBePlacedRandomLy) {
        const shipsToPlace = [...ships];
        while (shipsToPlace.length > 0) {
            try {
                const coordRow = generateRandom();
                const coordCol = generateRandom();
                const direction = getRandomDirection();
                const ship = shipsToPlace[shipsToPlace.length - 1];

                const shipPlaceOption: PlaceShipOptions = {
                    pos: {
                        column: coordCol,
                        row: coordRow
                    },
                    direction,
                    ship
                };
                this.placeShip(shipPlaceOption);
                shipsToPlace.pop();
            } catch {
                continue;
            }
        }
    }

    placeShip(placeShipOptions: PlaceShipOptions): void {
        const { pos, direction } = placeShipOptions;
        const { color, size } = placeShipOptions.ship;
        if (direction === ShipDirection.Horizontal) this.placeShipHorizontally(pos, color, size);
        if (direction === ShipDirection.Vertical) this.placeShipVertically(pos, color, size);
        return this.increaseShipCount();
    }

    getCell(pos: MatrixPosition): Cell {
        const { row, column } = pos;
        const cell = this.matrix[row][column];
        return cell;
    }

    display() {
        let display = "";
        for (const element of this.matrix) {
            for (let col = 0; col < this.matrix[0].length; col++) {
                display += element[col].getDisplayCharacter();
            }
            display += "\n";
        }
        return display.trim();
    }

    isLost() {
        return this.ships.every((ship) => ship.isDead());
    }

    private increaseShipCount() {
        this.shipCount += 1;
    }

    private placeShipHorizontally(pos: MatrixPosition, color: Color, size: number) {
        const { row, column } = pos;
        const maxColumn = column + size - 1;
        if (maxColumn >= this.matrix[0].length) throw new Error("Ship must be placed within the board");

        const shipCells = [];
        for (let currentCol = column; currentCol <= maxColumn; currentCol += 1) {
            if (this.matrix[row][currentCol].getShip()) throw new Error("Ship must not horizontally overlap other ship");
            shipCells.push(this.matrix[row][currentCol]);
        }

        const newShip = this.initializeShip(color, shipCells);

        this.ships.push(newShip);
    }

    private placeShipVertically(pos: MatrixPosition, color: Color, size: number) {
        const { row, column } = pos;
        const maxRow = row + size - 1;
        if (maxRow >= this.matrix.length) throw new Error("Ship must be placed within the board");

        const shipCells = [];
        for (let curRow = row; curRow <= maxRow; curRow += 1) {
            if (this.matrix[curRow][column].getShip()) throw new Error("Ship must not vertically overlap other ship");
            shipCells.push(this.matrix[curRow][column]);
        }

        const newShip = this.initializeShip(color, shipCells);

        this.ships.push(newShip);
    }

    private initializeShip(color: Color, shipCells: Cell[]) {
        const newShip = new Ship({
            color,
            cells: shipCells
        });

        return newShip;
    }
}

function generateRandom() {
    const rand = Math.random() * BOARD_SIZE;
    return Math.floor(rand);
}

function getRandomDirection() {
    const rand = Math.random() * 2;
    return Math.floor(rand) ? ShipDirection.Horizontal : ShipDirection.Vertical;
}

export type ShipsToBePlacedRandomLy = {
    ships: ShipToBePlaced[];
};

export type ShipToBePlaced = {
    size: number;
    color: Color;
};

export type PlaceShipOptions = {
    pos: MatrixPosition;
    ship: ShipToBePlaced;
    direction: ShipDirection;
};

export type MatrixPosition = {
    row: number;
    column: number;
};

export enum ShipDirection {
    Vertical,
    Horizontal
}
