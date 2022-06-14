import {CellProps} from "../../interfaces/interfaces";
import {PieceState} from "../consts/piece";
import {BOARD_SIZE_IN_CELLS} from "../consts/board";
import {getAllowedDirections, isMinePiece} from "../board/board";

const canBeat = (currentPiece: CellProps, selectedPiece: CellProps, board: CellProps[]): boolean => {
    if (!currentPiece?.piece || selectedPiece?.piece) {
        return false;
    }

    const currentPosition = board.findIndex((item: CellProps) => (
        item.row === currentPiece.row && item.col === currentPiece.col)
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

        let alienPieceCounter = 0;

        for (let i = 0; i < cellDifference; i++) {
            const nextCell = board[currentPosition + (direction * (i + 1))];

            if (nextCell.piece && isMinePiece(currentPiece, nextCell)) {
                return false;
            }

            if (nextCell.piece && !isMinePiece(currentPiece, nextCell)) {
                alienPieceCounter++;

                if (alienPieceCounter > 1) {
                    return false;
                }
            }
        }

        return alienPieceCounter === 1;
    }

    if (!getAllowedDirections(BOARD_SIZE_IN_CELLS).includes(Math.abs(direction))) {
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
