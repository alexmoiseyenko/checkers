import clsx from "clsx";
import {observer} from "mobx-react-lite";

import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import React from "react";
import {ICell} from "../../interfaces/interfaces";
import ThemeStore from "../../store/theme/ThemeStore";
import {Theme} from "../../enums/Theme";

interface IShowBoard {
    board: ICell[];
    currentPiece: ICell | null;
    onCellClick: (cell: ICell) => void;
    themeStore: ThemeStore;
}

const ShowBoard: React.FC<IShowBoard> = observer((props): JSX.Element => {
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

export default ShowBoard;
