import { PieceColor, PieceState } from "../consts/piece";
import {NUMBER_OF_PIECES} from "../consts/board";
import {ICell} from "../../interfaces/interfaces";

const getBoard = (size: number) => {
    const board = [];

    const isEven = (num: number): boolean => (
        num % 2 === 0
    );

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const isBlackCell = (!isEven(row) && isEven(col)) || (isEven(row) && !isEven(col));
            const isPiece = isBlackCell && (row < 3 || row > 4);
            const isPieceBlack = isBlackCell && row < 3;

            const piece = {
                state: PieceState.Man,
                color: isPieceBlack ? PieceColor.Black : PieceColor.White
            }

            board.push({
                row,
                col,
                isBlackCell,
                piece: isPiece ? piece : null,
            })
        }
    }

    return board;
};

const getCongratsText = (beatByWhite: ICell[]): string => {
    if (beatByWhite.length === NUMBER_OF_PIECES) {
        return "Whites win!";
    }

    return "Black win!";
};

export {
    getBoard,
    getCongratsText,
};
