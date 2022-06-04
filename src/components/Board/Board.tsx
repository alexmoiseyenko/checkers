import React, {useState} from "react";
import {getBoard, isMinePiece, isSamePiece} from "../../utils/common/common";
import {ICell} from "../../interfaces/interfaces";
import {PieceColor, PieceState} from "../../utils/consts/Piece";
import {BOARD_SIZE} from "../../utils/consts/board";
import canBeat from "../../utils/moves/canBeat";
import canMove from "../../utils/moves/canMove";
import ShowBoard from "../../utils/board";

export interface IBoard {
    size?: number;
}

const Board: React.FC<IBoard> = (): JSX.Element => {
    const [selectedPiece, setSelectedPiece] = useState<ICell>();
    const [updateBoard, setUpdateBoard] = useState<boolean>(false);
    const [board, setBoard] = useState<ICell[]>(getBoard(BOARD_SIZE));

    const [activeSide, setActiveSide] = useState<PieceColor>(PieceColor.White);

    const isShouldBecomeKing = (cell: ICell): boolean => {
        if (!selectedPiece) {
            return false;
        }
        if (cell.row === 0 && selectedPiece.piece?.color === PieceColor.White) {
            return true;
        }

        return cell.row === BOARD_SIZE - 1 && selectedPiece.piece?.color === PieceColor.Black;
    }

    const onCellClick = (cell: ICell): void => {
        if (cell.piece && !selectedPiece) {
            if (cell.piece.color === activeSide) {
                setSelectedPiece(cell);
            }
        } else if (cell.isBlackCell && selectedPiece) {
            if (isMinePiece(cell, selectedPiece)) {
                if (isSamePiece(cell, selectedPiece)) {
                    setSelectedPiece(undefined);
                } else {
                    setSelectedPiece(cell);
                }
            } else if (canMove(selectedPiece, cell, board, activeSide)) {
                const newBoard = Object.assign(board);
                const oldPosition = newBoard.findIndex((item: ICell) => (
                    item.row === selectedPiece?.row && item.col === selectedPiece?.col)
                );
                const newPosition = newBoard.findIndex((item: ICell) => (
                    item.row === cell?.row && item.col === cell?.col)
                );

                newBoard[newPosition] = {
                    ...newBoard[newPosition],
                    piece: newBoard[oldPosition].piece,
                };

                newBoard[oldPosition] = {
                    ...newBoard[oldPosition],
                    piece: null,
                };

                if (selectedPiece.piece?.state !== PieceState.King && isShouldBecomeKing(cell)) {
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
            } else if (canBeat(selectedPiece, cell, board)) {
                const newBoard = Object.assign(board);
                const oldPosition = newBoard.findIndex((item: ICell) => (
                    item.row === selectedPiece?.row && item.col === selectedPiece?.col)
                );
                const newPosition = newBoard.findIndex((item: ICell) => (
                    item.row === cell?.row && item.col === cell?.col)
                );

                if (selectedPiece?.piece?.state === PieceState.Man) {
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

                    if (isShouldBecomeKing(cell)) {
                        newBoard[newPosition] = {
                            ...newBoard[newPosition],
                            piece: {
                                ...newBoard[newPosition].piece,
                                state: PieceState.King
                            },
                        };
                    }
                } else if (selectedPiece?.piece?.state === PieceState.King) {
                    const currentPosition = board.findIndex((item: ICell) => (
                        item.row === selectedPiece?.row && item.col === selectedPiece?.col)
                    );

                    const cellPosition = board.findIndex((item: ICell) => (
                        item.row === cell?.row && item.col === cell?.col)
                    );


                    const cellDifference = Math.abs(cell.row - selectedPiece.row);
                    const direction = (cellPosition - currentPosition) / cellDifference;

                    const positionBetween = cellPosition - direction;

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
        }
    };

    return (
        <>
            <h2>
                Whose turn: {activeSide}
            </h2>
            <ShowBoard
                board={board}
                selectedPiece={selectedPiece}
                onCellClick={onCellClick}
            />
        </>
    )
};

export default Board;
