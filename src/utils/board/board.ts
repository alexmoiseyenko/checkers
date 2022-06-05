import {ICell} from "../../interfaces/interfaces";
import {PieceColor, PieceState} from "../consts/Piece";
import {BOARD_SIZE} from "../consts/board";
import canBeat from "../moves/canBeat";

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
};

const movePiece = (
    board: ICell[],
    currentPiece: ICell,
    selectedPiece: ICell,
    updateBoard: boolean,
    activeSide: PieceColor,
    setBoard: (board: ICell[]) => void,
    setSelectedPiece: (piece: ICell | undefined) => void,
    setUpdateBoard: (updateBoard: boolean) => void,
    setActiveSide: (activeSide: PieceColor) => void,
): void => {
    const newBoard = Object.assign(board);
    const oldPosition = newBoard.findIndex((item: ICell) => (
        item.row === currentPiece?.row && item.col === currentPiece?.col)
    );
    const newPosition = newBoard.findIndex((item: ICell) => (
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
        isShouldBecomeKing(currentPiece, selectedPiece)
    ) {
        newBoard[newPosition] = {
            ...newBoard[newPosition],
            piece: {
                ...newBoard[newPosition].piece,
                state: PieceState.King
            },
        };
    }

    setBoard(newBoard);
    setSelectedPiece(undefined);
    setUpdateBoard(!updateBoard);
    if (activeSide === PieceColor.White) {
        setActiveSide(PieceColor.Black);
    } else {
        setActiveSide(PieceColor.White);
    }
};

const beatPiece = (
    board: ICell[],
    currentPiece: ICell,
    selectedPiece: ICell,
    updateBoard: boolean,
    activeSide: PieceColor,
    setSelectedPiece: (piece: ICell | undefined) => void,
    setActiveSide: (activeSide: PieceColor) => void,
    setBoard: (board: ICell[]) => void,
    setUpdateBoard: (updateBoard: boolean) => void,
    setCanBeatAgain: (canBeatAgain: boolean) => void,
): void => {
    const newBoard = Object.assign(board);

    const currentPosition = newBoard.findIndex((item: ICell) => (
        item.row === currentPiece?.row && item.col === currentPiece?.col)
    );

    const newPosition = newBoard.findIndex((item: ICell) => (
        item.row === selectedPiece?.row && item.col === selectedPiece?.col)
    );

    let positionBetween;
    let isWillBeKing = currentPiece?.piece?.state === PieceState.Man &&
        isShouldBecomeKing(currentPiece, selectedPiece);

    if (currentPiece?.piece?.state === PieceState.Man) {
        positionBetween = newPosition - ((newPosition - currentPosition) / 2);
    } else {
        const cellDifference = Math.abs(selectedPiece.row - currentPiece.row);
        const direction = (newPosition - currentPosition) / cellDifference;

        positionBetween = newPosition - direction;
    }

    if (isWillBeKing) {
        newBoard[newPosition] = {
            ...newBoard[newPosition],
            piece: {
                ...newBoard[newPosition].piece,
                state: PieceState.King
            },
        };
    } else {
        newBoard[newPosition] = {
            ...newBoard[newPosition],
            piece: newBoard[currentPosition].piece,
        };
    }

    newBoard[currentPosition] = {
        ...newBoard[currentPosition],
        piece: null,
    };

    newBoard[positionBetween] = {
        ...newBoard[positionBetween],
        piece: null,
    };

    setBoard(newBoard);
    setUpdateBoard(!updateBoard);

    if (isWillBeKing) {
        return;
    }

    let allowedPositions;

    const topLeftCellPos = newPosition - (BOARD_SIZE - 1) * 2;
    const topRightCellPos = newPosition - (BOARD_SIZE + 1) * 2;
    const bottomLeftCellPos = newPosition + (BOARD_SIZE - 1) * 2;
    const bottomRightCellPos = newPosition + (BOARD_SIZE + 1) * 2;

    allowedPositions = [topLeftCellPos, topRightCellPos, bottomLeftCellPos, bottomRightCellPos];

    let canBeatAgain = false;

    for (let i = 0; i < allowedPositions.length; i++) {
        if (canBeat(newBoard[newPosition], newBoard[allowedPositions[i]], newBoard)) {
            setCanBeatAgain(true);
            setSelectedPiece(newBoard[newPosition]);
            canBeatAgain = true;
            return;
        }
    }

    if (!canBeatAgain) {
        setSelectedPiece(undefined);

        if (activeSide === PieceColor.White) {
            setActiveSide(PieceColor.Black);
        } else {
            setActiveSide(PieceColor.White);
        }
    }
}

export {
    isMinePiece,
    isSamePiece,
    getAllowedDirections,
    isShouldBecomeKing,
    movePiece,
    beatPiece,
}