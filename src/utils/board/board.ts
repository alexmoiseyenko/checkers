import {ICell} from "../../interfaces/interfaces";
import {PieceColor} from "../consts/Piece";
import {BOARD_SIZE} from "../consts/board";

const isMinePiece = (currentPiece: ICell, selectedPiece: ICell): boolean => {
    return currentPiece.piece?.color === selectedPiece.piece?.color;
};

const isSamePiece = (currentPiece: ICell, selectedPiece: ICell): boolean => {
    return currentPiece.row === selectedPiece.row && currentPiece.col === selectedPiece.col;
};

const getAllowedDirections = (boardSize: number): number[] => {
    const firstAllowedDirection = boardSize - 1;
    const secondAllowedDirection = boardSize + 1;

    return [firstAllowedDirection, secondAllowedDirection];
};

const isShouldBecomeKing = (currentPiece: ICell, selectedPiece: ICell): boolean => {
    if (!currentPiece) {
        return false;
    }
    if (selectedPiece.row === 0 && currentPiece.piece?.color === PieceColor.White) {
        return true;
    }

    return selectedPiece.row === BOARD_SIZE - 1 && currentPiece.piece?.color === PieceColor.Black;
}

export {
    isMinePiece,
    isSamePiece,
    getAllowedDirections,
    isShouldBecomeKing,
}