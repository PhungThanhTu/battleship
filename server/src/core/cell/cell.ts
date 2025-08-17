import { red, white } from "../../utils/color";
import SpecialCharacters from "../../utils/special-char";
import { CellStateMachine, CellState, createCellStateMachine } from "../cell-state-machine/cell-state-machine";
import { Ship } from "../ship/ship";
import { getNanoid } from "../../utils/id";

export class Cell {
  private id: string;
  private ship: Ship | null;
  private cellState: CellStateMachine;

  constructor(state?: CellState, id?: string) {
    this.id = id ?? getNanoid();
    this.ship =  null;
    this.cellState = createCellStateMachine(state);
  }

  shoot() {
    if (!this.ship) return this.cellState.point();
    
    this.cellState.shoot();
    this.ship.takeDamage();
  }

  getId() {
    return this.id;
  }

  getShip() {
    return this.ship;
  }

  setShip(ship: Ship) {
    this.ship = ship;
  }

  getState() {
    return this.cellState.getState();
  }

  getCellObject(): CellDisplayInfo {
    return {
      ship: this.getShip(),
      state: this.getState()
    }
  }
  
  getDisplayCharacter() {
    if (this.cellState.getState() === CellState.Scorched && !this.ship?.isDead()) return red(SpecialCharacters.FIRE);
    if (this.ship) {
      return this.ship.display();
    }
    if (this.cellState.getState() === CellState.Hidden) return white(SpecialCharacters.EMPTY_SQUARE);
    if (this.cellState.getState() === CellState.Pointed) return white(SpecialCharacters.CIRCLE);
    throw new Error("invalid state");    
  }
}

export type CellDisplayInfo = {
  ship: Ship | null;
  state: CellState;
}

export { CellStateMachine };

