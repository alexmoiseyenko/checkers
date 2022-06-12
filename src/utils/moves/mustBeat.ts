import { CellProps } from "../../interfaces/interfaces";
import { BOARD_SIZE_IN_CELLS } from "../consts/board";
import canBeat from "./canBeat";

const mustBeat = (currentPiece: CellProps, board: CellProps[]): boolean => {
    const currentPosition = board.findIndex((item: CellProps) => (
        item.row === currentPiece.row && item.col === currentPiece.col)
    );

    let allowedPositions: number[] = [];

    const topLeftCellPos = currentPosition - ((BOARD_SIZE_IN_CELLS - 1) * 2);
    const topRightCellPos = currentPosition - ((BOARD_SIZE_IN_CELLS + 1) * 2);
    const bottomLeftCellPos = currentPosition + ((BOARD_SIZE_IN_CELLS - 1) * 2);
    const bottomRightCellPos = currentPosition + ((BOARD_SIZE_IN_CELLS + 1) * 2);

    allowedPositions = [topLeftCellPos, topRightCellPos, bottomLeftCellPos, bottomRightCellPos];

    for (let i = 0; i < allowedPositions.length; i++) {
        const checkedPiece = board[allowedPositions[i]];
        if (!checkedPiece?.piece &&
            canBeat(currentPiece, checkedPiece, board)) {
            return true;
        }
    }

    return false;
};

export default mustBeat;
