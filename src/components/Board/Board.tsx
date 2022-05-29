import React, { useState } from "react";
import {getBoard, isMinePiece, isSamePiece} from "../../utils/common/common";
import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import {ICell} from "../../interfaces/interfaces";
import clsx from "clsx";

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

        const topLeftCellPos = currentPosition - BOARD_SIZE - 1;
        const topRightCellPos = currentPosition - BOARD_SIZE + 1;
        const bottomLeftCellPos = currentPosition + BOARD_SIZE - 1;
        const bottomRightCellPos = currentPosition + BOARD_SIZE + 1;

        const allowedPositions: number[] =
            [topLeftCellPos, topRightCellPos, bottomLeftCellPos, bottomRightCellPos];

        const cellPosition = board.findIndex((item: ICell) => (
            item.row === cell?.row && item.col === cell?.col)
        );

        // const direction = cellPosition - currentPosition;

        // if (cell?.piece?.state && selectedPiece?.piece.state !== cell?.piece.state) {
        //     canMove(board[cellPosition + direction])
        // }

        return allowedPositions.includes(cellPosition);
    };

    const canBeat = (cell: ICell): boolean => {
        if (!selectedPiece?.piece) {
            return false;
        }

        const currentPosition = board.findIndex((item: ICell) => (
            item.row === selectedPiece?.row && item.col === selectedPiece?.col)
        );

        const cellPosition = board.findIndex((item: ICell) => (
            item.row === cell?.row && item.col === cell?.col)
        );

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
                            <Piece
                                color={piece.color}
                                state={piece.state}
                            />
                        </div>
                        :
                        <div style={{ color: "white" }}>
                            idx: {cell}
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
