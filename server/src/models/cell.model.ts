import { CellState } from "../core/cell-state-machine/cell-state-machine";

export interface CellModel {
    id: string;
    state: CellState
}
