import { ShipDto } from "./ship.dto";

export interface CellDto {
    id: string;
    ship?: ShipDto | null;
    state: CellState;
}

export enum Color {
    Red = "#e53935",
    Purple = "#8E24AA",
    Blue = "#039BE5",
    Green = "#00897B",
    Navy = "#3949AB"
}

export enum CellState {
    Hidden = "hidden",
    Pointed = "pointed",
    Scorched = "scorched"
}

export type CellPositionDto = {
    row: number;
    column: number;
};
