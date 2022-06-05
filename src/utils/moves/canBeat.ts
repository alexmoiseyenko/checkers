import {ICell} from "../../interfaces/interfaces";
import {PieceState} from "../consts/Piece";
import {BOARD_SIZE} from "../consts/board";
import {getAllowedDirections, isMinePiece} from "../board/board";

const canBeat = (currentPiece: ICell, selectedPiece: ICell, board: ICell[]): boolean => {
    if (!currentPiece?.piece) {
        return false;
    }

    const currentPosition = board.findIndex((item: ICell) => (
        item.row === currentPiece?.row && item.col === currentPiece?.col)
    );

    const selectedPosition = board.findIndex((item: ICell) => (
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

    if (!getAllowedDirections(BOARD_SIZE).includes(Math.abs(direction))) {
        return false;
    }

    const isPiece = board[selectedPosition]?.piece;
    const pieceBetween = currentPosition + direction;

    if (!board[pieceBetween].piece) {
        return false;
    }

    return !isPiece && !isMinePiece(currentPiece, board[pieceBetween]);
};

export default canBeat;
