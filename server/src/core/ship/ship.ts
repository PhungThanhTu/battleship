import { Color, color } from "../../utils/color";
import { getNanoid } from "../../utils/id";
import SpecialCharacters from "../../utils/special-char";
import { Cell } from "../cell/cell";

export interface ShipOptions {
    color: Color;
    id?: string;
    currentCellCount?: number;
    cells?: Cell[]
}

export class Ship {
  private id: string;
  private color: Color;
  private currentCellCount: number;
  private size: number;
  private cells: Cell[];

  constructor(options: ShipOptions) {
    const { color, id, currentCellCount, cells } = options;
    this.id = id ?? getNanoid();
    this.color = color ?? Color.Red;
    this.cells = cells ?? [];
    this.size = cells?.length ?? 0;
    this.currentCellCount = currentCellCount ?? this.size;

    for (let cell of this.cells) {
      cell.setShip(this);
    }

  }

  getCurrentCellCount() {
    return this.currentCellCount;
  }

  getId() {
    return this.id;
  }

  getCells() {
    return this.cells;
  }

  getSize() {
    return this.size;
  }

  getColor() {
    return this.color;
  }

  isDead() {
    return this.currentCellCount == 0;
  }

  takeDamage() {
    this.currentCellCount -= 1;
  }

  display() {
    if (this.isDead()) return color(this.getColor() ?? Color.Red, SpecialCharacters.FILLED_ROUNDED_SQUARE) 
    return color(this.getColor() ?? Color.Red, SpecialCharacters.EMPTY_SQUARE) 
  }
}