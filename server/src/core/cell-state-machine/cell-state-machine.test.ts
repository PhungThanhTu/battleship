import { CellState, CellStateMachine } from './cell-state-machine';

describe("cell state machine work as expected", () => {
  test("constructor set init state to hidden", () => {
    const stateMachine = new CellStateMachine();
    const state = stateMachine.getState();

    expect(state).toBe(CellState.Hidden);
  });

  test("point make the state reveal if it is hidden", () => {
    const stateMachine = new CellStateMachine();
    stateMachine.point();

    const state = stateMachine.getState();

    expect(state).toBe(CellState.Pointed);
  });

  test("point an already pointed cell throw exception", () => {
    const stateMachine = new CellStateMachine();
    stateMachine.point();

    expect(() => {
      stateMachine.point();
    }).toThrow("You can only point a hidden cell");
  });

  test("shoot hidden cell make it scorched", () => {
    const stateMachine = new CellStateMachine();
    stateMachine.shoot();
    const state = stateMachine.getState();

    expect(state).toBe(CellState.Scorched);
  });

  test("shoot pointed cell throw", () => {
    const stateMachine = new CellStateMachine();
    stateMachine.point();
    
    expect(() => {
      stateMachine.shoot();
    }).toThrow("You can only shoot a hidden cell")
  });
});
