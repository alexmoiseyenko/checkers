import {PieceColor, PieceState} from "../utils/consts/Piece";

export interface IPiece {
    state: PieceState,
    color: PieceColor,
}

export interface ICell {
    row: number;
    col: number;
    isBlackCell: boolean;
    piece: IPiece | null;
}