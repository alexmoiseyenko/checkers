import { CellProps, PieceProps } from "../../interfaces/interfaces";
import { PieceColor, PieceState } from "../consts/piece";
import { BOARD_SIZE_IN_CELLS } from "../consts/board";
import canBeat from "../moves/canBeat";
import GameStore from "../../store/game/GameStore";

const gameStore = new GameStore();

const isMinePiece = (currentPiece: CellProps, selectedPiece: CellProps): boolean => {
    return currentPiece.piece?.color === selectedPiece.piece?.color;
};

const isSamePiece = (currentPiece: CellProps, selectedPiece: CellProps): boolean => {
    return currentPiece.row === selectedPiece.row && currentPiece.col === selectedPiece.col;
};

const getAllowedDirections = (boardSize: number): number[] => {
    const firstAllowedDirection = boardSize - 1;
    const secondAllowedDirection = boardSize + 1;

    return [firstAllowedDirection, secondAllowedDirection];
};

const shouldBecomeKing = (currentPiece: CellProps, selectedPiece: CellProps): boolean => (
    currentPiece.piece &&
    currentPiece.piece.color === PieceColor.White ?
        selectedPiece.row === 0 :
        selectedPiece.row === BOARD_SIZE_IN_CELLS - 1
);

const movePiece = (
    commonParams: {
        board: CellProps[],
        currentPiece: CellProps,
        selectedPiece: CellProps,
    },
): CellProps[] => {
    const {
        board,
        currentPiece,
        selectedPiece,
    } = commonParams;

    const newBoard = Object.assign(board);
    const oldPosition = newBoard.findIndex((item: CellProps) => (
        item.row === currentPiece?.row && item.col === currentPiece?.col)
    );
    const newPosition = newBoard.findIndex((item: CellProps) => (
        item.row === selectedPiece?.row && item.col === selectedPiece?.col)
    );

    newBoard[newPosition] = {
        ...newBoard[newPosition],
        piece: newBoard[oldPosition].piece,
    };

    newBoard[oldPosition] = {
        ...newBoard[oldPosition],
        piece: null,
    };

    if (
        currentPiece.piece?.state !== PieceState.King &&
        shouldBecomeKing(currentPiece, selectedPiece)
    ) {
        newBoard[newPosition] = {
            ...newBoard[newPosition],
            piece: {
                ...newBoard[newPosition].piece,
                state: PieceState.King
            },
        };
    }

    return newBoard;
};

const beatPiece = (
    commonParams: {
        board: CellProps[],
        currentPiece: CellProps,
        selectedPiece: CellProps,
    },
    beatByWhite: PieceProps[],
    beatByBlack: PieceProps[],
    canBeatPiece?: boolean,
): CellProps[] => {
    const {
        board,
        currentPiece,
        selectedPiece,
    } = commonParams;

    const newBoard = Object.assign(board);

    const currentPosition = newBoard.findIndex((item: CellProps) => (
        item.row === currentPiece?.row && item.col === currentPiece?.col)
    );

    const newPosition = newBoard.findIndex((item: CellProps) => (
        item.row === selectedPiece?.row && item.col === selectedPiece?.col)
    );

    let positionBetween;
    let willBeKing = currentPiece?.piece?.state === PieceState.Man &&
        shouldBecomeKing(currentPiece, selectedPiece);

    if (currentPiece?.piece?.state === PieceState.Man || canBeatPiece) {
        positionBetween = newPosition - ((newPosition - currentPosition) / 2);
    } else {
        const cellDifference = Math.abs(selectedPiece.row - currentPiece.row);
        const direction = (newPosition - currentPosition) / cellDifference;

        for (let i = 0; i < cellDifference; i++) {
            const nextCellPosition = currentPosition + (direction * (i + 1));

            if (board[nextCellPosition].piece) {
                positionBetween = nextCellPosition;
            }
        }
    }

    if (willBeKing) {
        newBoard[newPosition] = {
            ...newBoard[newPosition],
            piece: {
                ...newBoard[currentPosition].piece,
                state: PieceState.King
            },
        };
    } else {
        newBoard[newPosition] = {
            ...newBoard[newPosition],
            piece: newBoard[currentPosition].piece,
        };
    }

    if (currentPiece.piece?.color === PieceColor.White) {
        const beatByWhites = Object.assign(beatByWhite);
        beatByWhites.push(board[positionBetween].piece);
        gameStore.addBeatByWhite(beatByWhites);
    } else {
        const beatByBlackes = Object.assign(beatByBlack);
        beatByBlackes.push(board[positionBetween].piece);
        gameStore.addBeatByBlack(beatByBlackes);
    }

    newBoard[currentPosition] = {
        ...newBoard[currentPosition],
        piece: null,
    };

    newBoard[positionBetween] = {
        ...newBoard[positionBetween],
        piece: null,
    };

    return newBoard;
};

const canBeatPieceAgain = (selectedPiece: CellProps, board: CellProps[]): boolean => {
    const newPosition = board.findIndex((item: CellProps) => (
        item.row === selectedPiece?.row && item.col === selectedPiece?.col)
    );

    let allowedPositions;

    const topLeftCellPos = newPosition - (BOARD_SIZE_IN_CELLS - 1) * 2;
    const topRightCellPos = newPosition - (BOARD_SIZE_IN_CELLS + 1) * 2;
    const bottomLeftCellPos = newPosition + (BOARD_SIZE_IN_CELLS - 1) * 2;
    const bottomRightCellPos = newPosition + (BOARD_SIZE_IN_CELLS + 1) * 2;

    allowedPositions = [topLeftCellPos, topRightCellPos, bottomLeftCellPos, bottomRightCellPos];

    for (let i = 0; i < allowedPositions.length; i++) {
        if (canBeat(board[newPosition], board[allowedPositions[i]], board)) {
            return true;
        }
    }

    return false;
};

const switchSide = (activeSide: PieceColor, setActiveSide: (activeSide: PieceColor) => void): void => {
    if (activeSide === PieceColor.White) {
        setActiveSide(PieceColor.Black);
    } else {
        setActiveSide(PieceColor.White);
    }
};

export {
    isMinePiece,
    isSamePiece,
    getAllowedDirections,
    shouldBecomeKing,
    movePiece,
    beatPiece,
    switchSide,
    canBeatPieceAgain,
}