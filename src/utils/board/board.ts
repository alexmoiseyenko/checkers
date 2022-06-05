import {ICell} from "../../interfaces/interfaces";
import {PieceColor, PieceState} from "../consts/Piece";
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
}

export {
    isMinePiece,
    isSamePiece,
    getAllowedDirections,
    isShouldBecomeKing,
    movePiece,
}