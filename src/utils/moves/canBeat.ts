import {CellProps} from "../../interfaces/interfaces";
import {PieceState} from "../consts/piece";
import {CELLS_PER_BOAR_SIDE} from "../consts/board";
import {getAllowedDirections, isMinePiece} from "../board/board";

const canBeat = (currentPiece: CellProps, selectedPiece: CellProps, board: CellProps[]): boolean => {
    if (!currentPiece?.piece) {
        return false;
    }

    const currentPosition = board.findIndex((item: CellProps) => (
        item.row === currentPiece?.row && item.col === currentPiece?.col)
    );

    const selectedPosition = board.findIndex((item: CellProps) => (
        item.row === selectedPiece?.row && item.col === selectedPiece?.col)
    );

    if (selectedPosition === -1 || !board[selectedPosition].isBlackCell) {
        return false;
    }

    let direction;

    if (currentPiece.piece.state === PieceState.Man) {
        direction = (selectedPosition - currentPosition) / 2;
    } else {
        const cellDifference = Math.abs(currentPiece.row - selectedPiece.row);
        direction = (selectedPosition - currentPosition) / cellDifference;
    }

    if (!getAllowedDirections(CELLS_PER_BOAR_SIDE).includes(Math.abs(direction))) {
        return false;
    }

    const isPiece = board[selectedPosition]?.piece;
    const pieceBetween = selectedPosition - direction;

    if (!board[pieceBetween].piece) {
        return false;
    }

    return !isPiece && !isMinePiece(currentPiece, board[pieceBetween]);
};

export default canBeat;
