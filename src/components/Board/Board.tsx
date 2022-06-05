import React, {useState} from "react";
import {getBoard} from "../../utils/common/common";
import {ICell} from "../../interfaces/interfaces";
import {PieceColor, PieceState} from "../../utils/consts/Piece";
import {BOARD_SIZE} from "../../utils/consts/board";
import canBeat from "../../utils/moves/canBeat";
import canMove from "../../utils/moves/canMove";
import {beatPiece, isMinePiece, isSamePiece, isShouldBecomeKing, movePiece} from "../../utils/board/board";
import ShowBoard from "./ShowBoard";

export interface IBoard {
    size?: number;
}

const Board: React.FC<IBoard> = (): JSX.Element => {
    const [currentPiece, setCurrentPiece] = useState<ICell>();
    const [updateBoard, setUpdateBoard] = useState<boolean>(false);
    const [board, setBoard] = useState<ICell[]>(getBoard(BOARD_SIZE));

    const [activeSide, setActiveSide] = useState<PieceColor>(PieceColor.White);
    const [canBeatAgain, setCanBeatAgain] = useState<boolean>(false);

    const onCellClick = (selectedPiece: ICell): void => {
        if (selectedPiece.piece && !currentPiece) {
            if (selectedPiece.piece.color === activeSide) {
                setCurrentPiece(selectedPiece);
            }
        } else if (selectedPiece.isBlackCell && currentPiece) {
            if (canBeatAgain) {
                if (canBeat(currentPiece, selectedPiece, board)) {
                    setCanBeatAgain(false);
                    const newBoard = Object.assign(board);
                    const oldPosition = newBoard.findIndex((item: ICell) => (
                        item.row === currentPiece?.row && item.col === currentPiece?.col)
                    );
                    const newPosition = newBoard.findIndex((item: ICell) => (
                        item.row === selectedPiece?.row && item.col === selectedPiece?.col)
                    );

                    const positionBetween = newPosition - ((newPosition - oldPosition) / 2);

                    newBoard[newPosition] = {
                        ...newBoard[newPosition],
                        piece: newBoard[oldPosition].piece,
                    };

                    newBoard[oldPosition] = {
                        ...newBoard[oldPosition],
                        piece: null,
                    };

                    newBoard[positionBetween] = {
                        ...newBoard[positionBetween],
                        piece: null,
                    };

                    if (isShouldBecomeKing(currentPiece, selectedPiece)) {
                        newBoard[newPosition] = {
                            ...newBoard[newPosition],
                            piece: {
                                ...newBoard[newPosition].piece,
                                state: PieceState.King
                            },
                        };
                    }

                    let allowedPositions;

                    const topLeftCellPos = newPosition - BOARD_SIZE - 1;
                    const topRightCellPos = newPosition - BOARD_SIZE + 1;
                    const bottomLeftCellPos = newPosition + BOARD_SIZE - 1;
                    const bottomRightCellPos = newPosition + BOARD_SIZE + 1;

                    allowedPositions = [topLeftCellPos, topRightCellPos, bottomLeftCellPos, bottomRightCellPos];

                    setBoard(newBoard);

                    setUpdateBoard(!updateBoard);

                    let canBeatAgain = false;

                    for (let i = 0; i < allowedPositions.length; i++) {
                        if (canBeat(selectedPiece, board[allowedPositions[i]], board)) {
                            setCanBeatAgain(true);
                            setCurrentPiece(selectedPiece);
                            canBeatAgain = true;
                            return;
                        }
                    }

                    if (!canBeatAgain) {
                        setCurrentPiece(undefined);

                        if (activeSide === PieceColor.White) {
                            setActiveSide(PieceColor.Black);
                        } else {
                            setActiveSide(PieceColor.White);
                        }
                    }
                }
            } else if (isMinePiece(selectedPiece, currentPiece)) {
                if (isSamePiece(selectedPiece, selectedPiece)) {
                    setCurrentPiece(undefined);
                } else {
                    setCurrentPiece(selectedPiece);
                }
            } else if (canMove(currentPiece, selectedPiece, board, activeSide)) {
                movePiece(
                    board,
                    currentPiece,
                    selectedPiece,
                    updateBoard,
                    activeSide,
                    setBoard,
                    setCurrentPiece,
                    setUpdateBoard,
                    setActiveSide,
                );
            } else if (canBeat(currentPiece, selectedPiece, board)) {
                beatPiece(
                    board,
                    currentPiece,
                    selectedPiece,
                    updateBoard,
                    activeSide,
                    setCurrentPiece,
                    setActiveSide,
                    setBoard,
                    setUpdateBoard,
                    setCanBeatAgain,
                )
            }
        }
    };

    return (
        <>
            <h2>
                Whose turn: {activeSide}
            </h2>
            <ShowBoard
                board={board}
                currentPiece={currentPiece}
                onCellClick={onCellClick}
            />
        </>
    )
};

export default Board;
