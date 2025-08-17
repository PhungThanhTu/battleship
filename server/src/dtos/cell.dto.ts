import { CellState } from "../core/cell-state-machine/cell-state-machine";
import { ShipDto } from "./ship.dto";

export type CellDto = {
    id: string;
    state: CellState;
    ship: ShipDto | null
}
