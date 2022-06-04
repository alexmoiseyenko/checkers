import {ICell} from "../../interfaces/interfaces";
import {PieceState} from "../consts/Piece";
import {getAllowedDirections, isMinePiece} from "../common/common";
import {BOARD_SIZE} from "../consts/board";

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

    if (currentPiece.piece.state === PieceState.Man) {
        const direction = (selectedPosition - currentPosition) / 2;

        const isPiece = board[selectedPosition]?.piece;
        const pieceBetween = currentPosition + direction;

        return !isPiece && !isMinePiece(currentPiece, board[pieceBetween]);
    } else if (currentPiece.piece.state === PieceState.King) {
        const cellDifference = Math.abs(currentPiece.row - selectedPiece.row);
        const direction = (selectedPosition - currentPosition) / cellDifference;

        if (!getAllowedDirections(BOARD_SIZE).includes(Math.abs(direction))) {
            return false;
        }

        const isPiece = board[selectedPosition]?.piece;
        const pieceBetween = selectedPosition - direction;

        if (!board[pieceBetween].piece) {
            return false;
        }

        return !isPiece && !isMinePiece(currentPiece, board[pieceBetween]);
    }

    return false;
};

export default canBeat;
