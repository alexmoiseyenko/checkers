import clsx from "clsx";
import {observer} from "mobx-react-lite";

import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import React from "react";
import {CellProps} from "../../interfaces/interfaces";
import ThemeStore from "../../store/theme/ThemeStore";
import {Theme} from "../../enums/Theme";

interface BoardProps {
    board: CellProps[];
    currentPiece: CellProps | null;
    onCellClick: (cell: CellProps) => void;
    themeStore: ThemeStore;
}

const Board: React.FC<BoardProps> = observer((props): JSX.Element => {
    const {
        board,
        currentPiece,
        onCellClick,
        themeStore,
    } = props;

    const cells: JSX.Element[] = [];

    for (let cell = 0; cell < board.length; cell++) {
        const currentCell = board[cell];
        const { row, col, isBlackCell, piece } = currentCell;

        const isActiveCell = row === currentPiece?.row && col === currentPiece.col;
        cells.push(
            <div
                onClick={() => onCellClick(currentCell)}
                data-cell={`row-${row} col-${col}`}
                className={clsx(
                    styles.cell,
                    {[styles.cellBlack]: isBlackCell},
                    {[styles.cell_active]: isActiveCell},
                    {[styles.blackTheme]: themeStore.theme === Theme.Black},
                    {[styles.win95Theme]: themeStore.theme === Theme.Win95},
                )}
            >
                {piece ? (
                    <Piece
                        color={piece.color}
                        state={piece.state}
                        themeStore={themeStore}
                    />
                ) : (
                    <div style={{ color: "white" }}>
                        {/*idx: {cell}*/}
                        {/*row: {row}*/}
                    </div>
                )
                }
            </div>
        );
    }

    return (
        <div className={clsx(
            styles.board,
            {[styles.boardWin95]: themeStore.theme === Theme.Win95},
        )}>
            {cells}
        </div>
    );
});

export default Board;
