import {PieceColor, PieceState} from "../utils/consts/piece";

export interface PieceProps {
    state: PieceState,
    color: PieceColor,
}

export interface CellProps {
    row: number;
    col: number;
    isBlackCell: boolean;
    piece: PieceProps | null;
}