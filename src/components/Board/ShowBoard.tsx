import clsx from "clsx";
import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import {CELL_SIZE} from "../../utils/consts/board";
import React from "react";
import {ICell} from "../../interfaces/interfaces";

interface IShowBoard {
    board: ICell[];
    currentPiece: ICell | null;
    onCellClick: (cell: ICell) => void;
}

const ShowBoard: React.FC<IShowBoard> = (props): JSX.Element => {
    const {
        board,
        currentPiece,
        onCellClick,
    } = props;

    const cells: JSX.Element[] = [];

    let colPosition = 0;
    let rowPosition = 0;

    for (let cell = 0; cell < board.length; cell++) {
        const currentCell = board[cell];
        const { row, col, isBlackCell, piece } = currentCell;

        const isActiveCell = row === currentPiece?.row && col === currentPiece.col;
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

    return (
        <div className={styles.boardWrapper}>
            {cells}
        </div>
    );
};

export default ShowBoard;
