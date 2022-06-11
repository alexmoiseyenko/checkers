import { CellProps, PieceProps } from "../../interfaces/interfaces";
import { PieceColor, PieceState } from "../consts/piece";
import { CELLS_PER_BOAR_SIDE } from "../consts/board";
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

const shouldBecomeKing = (currentPiece: CellProps, selectedPiece: CellProps): boolean => {
    if (!currentPiece) {
        return false;
    }
    if (selectedPiece.row === 0 && currentPiece.piece?.color === PieceColor.White) {
        return true;
    }

    return selectedPiece.row === CELLS_PER_BOAR_SIDE - 1 && currentPiece.piece?.color === PieceColor.Black;
};

const movePiece = (
    commonParams: {
        board: CellProps[],
        currentPiece: CellProps,
        selectedPiece: CellProps,
        updateBoard: boolean,
        activeSide: PieceColor,
        setCurrentPiece: (piece: CellProps | null) => void,
        setActiveSide: (activeSide: PieceColor) => void,
        setBoard: (board: CellProps[]) => void,
        setUpdateBoard: (updateBoard: boolean) => void,
    },
): void => {
    const {
        board,
        currentPiece,
        selectedPiece,
        updateBoard,
        activeSide,
        setCurrentPiece,
        setActiveSide,
        setBoard,
        setUpdateBoard,
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

    setBoard(newBoard);
    setCurrentPiece(null);
    setUpdateBoard(!updateBoard);
    switchSide(activeSide, setActiveSide);
};

const beatPiece = (
    commonParams: {
        board: CellProps[],
        currentPiece: CellProps,
        selectedPiece: CellProps,
        updateBoard: boolean,
        activeSide: PieceColor,
        setCurrentPiece: (piece: CellProps | null) => void,
        setActiveSide: (activeSide: PieceColor) => void,
        setBoard: (board: CellProps[]) => void,
        setUpdateBoard: (updateBoard: boolean) => void,
    },
    beatByWhite: PieceProps[],
    beatByBlack: PieceProps[],
    setCanBeatAgain: (canBeatAgain: boolean) => void,
    canBeatPiece?: boolean,
): void => {
    const {
        board,
        currentPiece,
        selectedPiece,
        updateBoard,
        activeSide,
        setCurrentPiece,
        setActiveSide,
        setBoard,
        setUpdateBoard,
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

        positionBetween = newPosition - direction;
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

    setBoard(newBoard);
    setUpdateBoard(!updateBoard);

    if (willBeKing) {
        setCurrentPiece(null);
        switchSide(activeSide, setActiveSide);
        return;
    }

    let allowedPositions;

    const topLeftCellPos = newPosition - (CELLS_PER_BOAR_SIDE - 1) * 2;
    const topRightCellPos = newPosition - (CELLS_PER_BOAR_SIDE + 1) * 2;
    const bottomLeftCellPos = newPosition + (CELLS_PER_BOAR_SIDE - 1) * 2;
    const bottomRightCellPos = newPosition + (CELLS_PER_BOAR_SIDE + 1) * 2;

    allowedPositions = [topLeftCellPos, topRightCellPos, bottomLeftCellPos, bottomRightCellPos];

    let canBeatAgain = false;

    for (let i = 0; i < allowedPositions.length; i++) {
        if (canBeat(newBoard[newPosition], newBoard[allowedPositions[i]], newBoard)) {
            setCanBeatAgain(true);
            setCurrentPiece(newBoard[newPosition]);
            canBeatAgain = true;
            return;
        }
    }

    if (!canBeatAgain) {
        setCurrentPiece(null);

        switchSide(activeSide, setActiveSide);
    }
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
}