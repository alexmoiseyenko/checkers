import {ICell} from "../../interfaces/interfaces";
import {PieceColor, PieceState} from "../consts/Piece";
import {BOARD_SIZE} from "../consts/board";
import {getAllowedDirections} from "../common/common";

const canMove = (
    currentPiece: ICell,
    selectedPiece: ICell,
    board: ICell[],
    activeSide: PieceColor
): boolean => {
    if (!currentPiece?.piece) {
        return false;
    }

    if (currentPiece.piece.color !== activeSide) {
        return false;
    }

    if (selectedPiece.piece) {
        return false;
    }

    const currentPosition = board.findIndex((item: ICell) => (
        item.row === currentPiece?.row && item.col === currentPiece?.col)
    );

    const selectedPosition = board.findIndex((item: ICell) => (
        item.row === selectedPiece?.row && item.col === selectedPiece?.col)
    );

    let allowedPositions: number[] = [];

    if (currentPiece.piece.state === PieceState.Man) {
        if (currentPiece.piece.color === PieceColor.White) {
            const topLeftCellPos = currentPosition - BOARD_SIZE - 1;
            const topRightCellPos = currentPosition - BOARD_SIZE + 1;

            allowedPositions = [topLeftCellPos, topRightCellPos];
        } else if (currentPiece.piece.color === PieceColor.Black) {
            const bottomLeftCellPos = currentPosition + BOARD_SIZE - 1;
            const bottomRightCellPos = currentPosition + BOARD_SIZE + 1;

            allowedPositions = [bottomLeftCellPos, bottomRightCellPos];
        }

        return allowedPositions.includes(selectedPosition);
    } else if (currentPiece.piece.state === PieceState.King) {
        const cellDifference = Math.abs(selectedPiece.row - currentPiece.row);
        const direction = (selectedPosition - currentPosition) / cellDifference;
        let allowedPosition = currentPosition + direction;

        if (!getAllowedDirections(BOARD_SIZE).includes(Math.abs(direction))) {
            return false;
        }

        for (let i = 0; i < cellDifference; i++) {
            if (board[allowedPosition].piece) {
                return false;
            }

            allowedPositions.push(allowedPosition);
            allowedPosition += direction;
        }

        return allowedPositions.includes(selectedPosition);
    }

    return false;
};

export default canMove;
