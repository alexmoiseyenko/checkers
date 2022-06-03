import React, {useState} from "react";
import {getBoard, isMinePiece, isSamePiece} from "../../utils/common/common";
import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import {ICell} from "../../interfaces/interfaces";
import clsx from "clsx";
import {PieceColor, PieceState} from "../../utils/consts/Piece";

export interface IBoard {
    size?: number;
}

const BOARD_SIZE = 8;
const CELL_SIZE = 100;

const Board: React.FC<IBoard> = (): JSX.Element => {
    const [selectedPiece, setSelectedPiece] = useState<ICell>();
    const [updateBoard, setUpdateBoard] = useState<boolean>(false);

    const [board, setBoard] = useState<ICell[]>(getBoard(BOARD_SIZE));

    const canMove = (cell: ICell): boolean => {
        if (!selectedPiece?.piece) {
            return false;
        }

        if (cell.piece) {
            return false;
        }

        const currentPosition = board.findIndex((item: ICell) => (
            item.row === selectedPiece?.row && item.col === selectedPiece?.col)
        );

        let allowedPositions: number[] = [];

        const cellPosition = board.findIndex((item: ICell) => (
            item.row === cell?.row && item.col === cell?.col)
        );

        if (selectedPiece.piece.state === PieceState.Man) {
            if (selectedPiece.piece.color === PieceColor.White) {
                const topLeftCellPos = currentPosition - BOARD_SIZE - 1;
                const topRightCellPos = currentPosition - BOARD_SIZE + 1;

                allowedPositions = [topLeftCellPos, topRightCellPos];
            } else if (selectedPiece.piece.color === PieceColor.Black) {
                const bottomLeftCellPos = currentPosition + BOARD_SIZE - 1;
                const bottomRightCellPos = currentPosition + BOARD_SIZE + 1;

                allowedPositions = [bottomLeftCellPos, bottomRightCellPos];
            }

            return allowedPositions.includes(cellPosition);
        } else if (selectedPiece.piece.state === PieceState.King) {
            const cellDifference = Math.abs(cell.row - selectedPiece.row);
            const direction = (cellPosition - currentPosition) / cellDifference;
            let allowedPosition = currentPosition + direction;

            if (![9, 7].includes(Math.abs(direction))) {
                return false;
            }

            for (let i = 0; i < cellDifference; i++) {
                if (board[allowedPosition].piece) {
                    return false;
                }
                allowedPositions.push(allowedPosition);

                if (board[allowedPosition].piece) {
                    return false;
                }

                allowedPosition += direction;
            }

            return allowedPositions.includes(cellPosition);
        }

        return false;
    };

    const canBeat = (cell: ICell): boolean => {
        if (!selectedPiece?.piece) {
            return false;
        }

        const currentPosition = board.findIndex((item: ICell) => (
            item.row === selectedPiece?.row && item.col === selectedPiece?.col)
        );

        let allowedPositions: number[] = [];

        const cellPosition = board.findIndex((item: ICell) => (
            item.row === cell?.row && item.col === cell?.col)
        );

        if (selectedPiece.piece.state === PieceState.Man) {
            const topLeftCellPos = currentPosition - ((BOARD_SIZE - 1) * 2);
            const topRightCellPos = currentPosition - ((BOARD_SIZE + 1) * 2);
            const bottomLeftCellPos = currentPosition + ((BOARD_SIZE - 1) * 2);
            const bottomRightCellPos = currentPosition + ((BOARD_SIZE + 1) * 2);

            const allowedPositions: number[] =
                [topLeftCellPos, topRightCellPos, bottomLeftCellPos, bottomRightCellPos];

            if (!allowedPositions.includes(cellPosition)) {
                return false;
            }

            const direction = (cellPosition - currentPosition) / 2;

            const isPiece = board[cellPosition]?.piece;
            const pieceBetween = currentPosition + direction;

            return !isPiece && !isMinePiece(cell, board[pieceBetween]);
        } else if (selectedPiece.piece.state === PieceState.King) {
            const cellDifference = Math.abs(cell.row - selectedPiece.row);
            const direction = (cellPosition - currentPosition) / cellDifference;

            if (![9, 7].includes(Math.abs(direction))) {
                return false;
            }

            const isPiece = board[cellPosition]?.piece;
            const pieceBetween = cellPosition - direction;

            return !isPiece && !isMinePiece(cell, board[pieceBetween]);
        }

        return false;
    };

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
            setSelectedPiece(cell);
        } else if (cell.isBlackCell && selectedPiece) {
            if (isMinePiece(cell, selectedPiece)) {
                if (isSamePiece(cell, selectedPiece)) {
                    setSelectedPiece(undefined);
                } else {
                    setSelectedPiece(cell);
                }
            } else if (canMove(cell)) {
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
            } else if (canBeat(cell)) {
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
            }
        }
    };

    const cells: JSX.Element[] = [];
    const showBoard = (): JSX.Element[] => {
        let colPosition = 0;
        let rowPosition = 0;
        for (let cell = 0; cell < board.length; cell++) {
            const currentCell = board[cell];
            const { row, col, isBlackCell, piece } = currentCell;

            const isActiveCell = row === selectedPiece?.row && col === selectedPiece.col;
            cells.push(
                <div
                    onClick={() => onCellClick(currentCell)}
                    data-cell={`row-${row} col-${col}`}
                    style={{
                        top: `${rowPosition}px`,
                        left: `${colPosition}px`,
                    }}
                    className={clsx(
                        styles.cell,
                        {[styles.cell_black]: isBlackCell},
                        {[styles.cell_active]: isActiveCell},
                    )}
                >
                    {piece ?
                        <div style={{ color: "white" }}>
                            idx: {cell}
                            row: {row}
                            state: {piece.state}
                            <Piece
                                color={piece.color}
                                state={piece.state}
                            />
                        </div>
                        :
                        <div style={{ color: "white" }}>
                            idx: {cell}
                            row: {row}
                        </div>
                    }
                </div>
            );

            if (currentCell.col >= Math.sqrt(board.length) - 1) {
                colPosition = 0;
                rowPosition += CELL_SIZE;
            } else {
                colPosition += CELL_SIZE;
            }
        }

        return cells;
    };

    return (
        <>
            {showBoard()}
        </>
    )
};

export default Board;
