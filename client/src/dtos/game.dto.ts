import { CellDto } from "./cell.dto";

export interface ShootPositionDto {
    row: number;
    column: number;
}

export interface GameFetchResponseDto {
    enemies: CellDto[][][];
    allies: CellDto[][][];
    isTurn: boolean;
}
