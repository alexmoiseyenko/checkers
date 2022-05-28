import React, { useState } from "react";
import getBoard from "../../utils/common/common";
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

    const onCellClick = (cell: ICell): void => {
        if (cell.piece && !selectedPiece) {
            setSelectedPiece(cell);
        } else if (cell.isBlackCell && selectedPiece) {
            const newBoard = Object.assign(board);
            const oldPosition = newBoard.findIndex((item: ICell) => (
                item.row === selectedPiece?.row && item.col === selectedPiece?.col)
            );
            const newPosition = newBoard.findIndex((item: ICell) => (
                item.row === cell?.row && item.col === cell?.col)
            );

            newBoard[oldPosition] = { ...newBoard[oldPosition], piece: 0 };
            newBoard[newPosition] = { ...newBoard[newPosition], piece: 1 };

            setBoard(newBoard);
            setSelectedPiece(undefined);
            setUpdateBoard(!updateBoard);
        }
    };

    const cells: JSX.Element[] = [];
    const showBoard = (): JSX.Element[] => {
        let colPosition = 0;
        let rowPosition = 0;
        for (let cell = 0; cell < board.length; cell++) {
            const currentCell = board[cell];
            const { row, col, isBlackCell, piece } = currentCell;
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
