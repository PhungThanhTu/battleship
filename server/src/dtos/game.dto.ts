import { CellDto } from "./cell.dto";

export interface ShootRequestDto {
    row: number;
    column: number;
}

export interface GameStateDto {
    enemies: CellDto[][][],
    allies: CellDto[][][],
    isTurn: boolean
}