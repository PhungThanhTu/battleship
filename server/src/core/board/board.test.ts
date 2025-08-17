import { Color } from '../../utils/color';
import { CellState } from '../cell-state-machine/cell-state-machine';
import { Board, MatrixPosition, PlaceShipOptions, ShipDirection, ShipsToBePlacedRandomLy } from './board'

function cellRightBottom(pos: MatrixPosition, bottom: number, right: number) {
  return {
    row: pos.row + bottom,
    column: pos.column + right,
  }
}
function cellRight(pos: MatrixPosition, n: number): MatrixPosition {
  return cellRightBottom(pos, 0, n);
}

function cellBottom(pos: MatrixPosition, n: number): MatrixPosition {
  return cellRightBottom(pos, n, 0);
}


describe("board should function rightly", () => {
  test("should be able to display", () => {
    let board = new Board();

    const boardDisplay = board.display();
    console.log(boardDisplay);
    expect(boardDisplay).toBeTruthy();
  });

  test("should put ship horizontally", () => {
    const pos: MatrixPosition = {
      row: 0,
      column: 0
    }
    const placeShipOptions: PlaceShipOptions = {
      pos,
      ship: {
        color: Color.Green,
        size: 2
      },
      direction: ShipDirection.Horizontal,
    }

    const board = new Board();
    board.placeShip(placeShipOptions);

    expect(board.getCell(pos).getShip()?.getColor()).toBe(Color.Green)
    expect(board.getCell(cellRight(pos, 1)).getShip()?.getColor()).toBe(Color.Green);
  });

  test("should put ship vertically", () => {
    const pos: MatrixPosition = {
      row: 0,
      column: 0
    }
    const placeShipOptions: PlaceShipOptions = {
      pos,
      ship: {
        color: Color.Green,
        size: 4
      },
      direction: ShipDirection.Vertical,
    }

    const board = new Board();
    board.placeShip(placeShipOptions);
    console.log(board.display());
    for (let i = 0; i < placeShipOptions.ship.size; i++) {
      expect(board.getCell(cellBottom(pos, i)).getShip()?.getColor()).toBe(Color.Green);
    }
  });

  test("point a cell without ship make it pointed", () => {
    const board = new Board();

    const pointPos: MatrixPosition = {
      row: 0,
      column: 0
    }
    board.shoot(pointPos);
    console.log(board.display());
    expect(board.getCell(pointPos).getState()).toBe(CellState.Pointed);
    expect(board.getCell(cellRight(pointPos, 1)).getState()).toBe(CellState.Hidden);
  });

  test("point a cell with ship make it scorched", () => {
    const board = new Board();

    const pos: MatrixPosition = {
      row: 0,
      column: 0
    }
    const placeShipOptions: PlaceShipOptions = {
      pos,
      ship: {
        color: Color.Green,
        size: 4
      },
      direction: ShipDirection.Vertical,
    }

    board.placeShip(placeShipOptions);

    const pointPos: MatrixPosition = {
      row: 0,
      column: 0
    }
    board.shoot(pointPos);
    console.log(board.display());
    expect(board.getCell(pointPos).getState()).toBe(CellState.Scorched);
    expect(board.getCell(cellRight(pointPos, 1)).getState()).toBe(CellState.Hidden);
  });

  test("shoot whole ship make it revealed", () => {
    const board = new Board();

    const pos: MatrixPosition = {
      row: 0,
      column: 0
    }
    const placeShipOptions: PlaceShipOptions = {
      pos,
      ship: {
        color: Color.Green,
        size: 4
      },
      direction: ShipDirection.Vertical,
    }

    board.placeShip(placeShipOptions);

    const pointPos: MatrixPosition = {
      row: 0,
      column: 0
    }
    board.shoot(pointPos);
    board.shoot(cellBottom(pointPos,1));
    board.shoot(cellBottom(pointPos,2));
    board.shoot(cellBottom(pointPos,3));
    console.log(board.display());
    expect(board.getCell(pointPos).getShip()?.isDead()).toBe(true);
  });

  test("generate random ship with ease", () => {
    mockMathRandom();
    const shipsToBePlaced: ShipsToBePlacedRandomLy = {
      ships: [
        {
          color: Color.Green,
          size: 2
        },
        {
          color: Color.Purple,
          size: 3
        },
        {
          color: Color.Navy,
          size: 3
        },
        {
          color: Color.Red,
          size: 5,
        },
      ]
    };

    const board = new Board();
    board.placeRandomShips(shipsToBePlaced);
    console.log(board.display());

    expect(board.getShipCount()).toBe(shipsToBePlaced.ships.length);
  });

});
const gen = randomValueGenerator();

function mockMathRandom() {

  jest.spyOn(Math, "random").mockImplementation(() => {

    return (gen.next().value as number);
  });
}

function* randomValueGenerator() {
  const predefinedRandomCoord = [
    0,3,
    1,0, // conflict horizontal,
    3,0,
    2,0, // conflict vertical
    2,0,
    7,0,
  ]
  const predefinedRandomDirection = [
    ShipDirection.Vertical,
    ShipDirection.Horizontal, // conflict
    ShipDirection.Horizontal,
    ShipDirection.Vertical, // conflict
    ShipDirection.Horizontal,
    ShipDirection.Horizontal
  ]

  let indexRandomCoord = 0;
  let indexRandomDirection = 0;

  while(true) {
    const randCoordRow = predefinedRandomCoord[indexRandomCoord] / 10;
    indexRandomCoord = (indexRandomCoord + 1) % predefinedRandomCoord.length;
    yield randCoordRow;
    const randCoordCol = predefinedRandomCoord[indexRandomCoord] / 10;
    indexRandomCoord = (indexRandomCoord + 1) % predefinedRandomCoord.length;
    yield randCoordCol;

    const randDir = predefinedRandomDirection[indexRandomDirection];
    indexRandomDirection = (indexRandomDirection + 1) % predefinedRandomDirection.length;
    yield randDir;
  }
}