import { Cell, CellDisplayInfo } from './cell'
import { Ship } from '../ship/ship';
import { CellState } from '../cell-state-machine/cell-state-machine';
import { Color } from '../../utils/color';

describe("cell should work as expected", () => {
  test("default construtor should have no ship", () => {
    const cell = new Cell();
    const ship = cell.getShip();

    expect(ship).toBe(null);
  });

  test("shoot hidden cell with no ship make it pointed", () => {
    const cell = new Cell();
    cell.shoot();
    const state = cell.getState();

    expect(state).toBe(CellState.Pointed);
  });

  test("shoot hidden cell with ship make it scorched", () => {
    const ship = new Ship({
      color: Color.Red
    });
    const cell = new Cell();
    cell.setShip(ship);
    cell.shoot();
    const state = cell.getState();

    expect(state).toBe(CellState.Scorched);
  });

  test("reveal ship should make it state to reveal", () => {
    const cell = new Cell();
    const ship = new Ship({
      color: Color.Red,
      cells: [cell]
    });
    cell.setShip(ship);
    cell.shoot();

    expect(ship.isDead()).toBe(true);
  });

  test("cell objest shold return right data shape", () => {
    const ship = new Ship({
      color: Color.Blue
    });
    const cell = new Cell();
    cell.setShip(ship);
    const expectedObject: CellDisplayInfo = {
      ship: ship,
      state: CellState.Hidden
    };
    const actualObject = cell.getCellObject();
    
    expect(JSON.stringify(actualObject)).toBe(JSON.stringify(expectedObject));
  });
})