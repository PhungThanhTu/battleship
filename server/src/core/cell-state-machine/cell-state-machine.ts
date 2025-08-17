export enum CellState {
  Hidden = "hidden",
  Pointed = "pointed",
  Scorched = "scorched"
}

export function createCellStateMachine(state?: CellState) {
  return new CellStateMachine(state);
}

export class CellStateMachine {
  private state: CellState;

  constructor(state: CellState = CellState.Hidden) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  point() {
    if (this.state !== CellState.Hidden) {
      throw new Error("You can only point a hidden cell");
    }

    this.state = CellState.Pointed;
  }

  shoot() {
    if (this.state !== CellState.Hidden) {
      throw new Error("You can only shoot a hidden cell");
    }
    
    this.state = CellState.Scorched;
  }

}