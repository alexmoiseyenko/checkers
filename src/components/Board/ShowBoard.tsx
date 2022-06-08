import clsx from "clsx";
import {observer} from "mobx-react-lite";

import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import {CELL_SIZE} from "../../utils/consts/board";
import React from "react";
import {ICell} from "../../interfaces/interfaces";
import ThemeStore from "../../theme/ThemeStore";
import {Theme} from "../../theme/Theme";

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

    let colPosition = 0;
    let rowPosition = 0;

    for (let cell = 0; cell < board.length; cell++) {
        const currentCell = board[cell];
        const { row, col, isBlackCell, piece } = currentCell;

        if (isBlackCell) {
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
                        {[styles.blackTheme]: themeStore.theme === Theme.Black},
                        {[styles.win95Theme]: themeStore.theme === Theme.Win95},
                    )}
                >
                    {piece ? (
                        <div style={{ color: "white" }}>
                            {/*idx: {cell}*/}
                            {/*row: {row}*/}
                            {/*state: {piece.state}*/}
                            <Piece
                                color={piece.color}
                                state={piece.state}
                                themeStore={themeStore}
                            />
                        </div>
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

        if (currentCell.col >= Math.sqrt(board.length) - 1) {
            colPosition = 0;
            rowPosition += CELL_SIZE;
        } else {
            colPosition += CELL_SIZE;
        }
    }

    return (
        <div className={clsx(
            styles.boardWrapper,
            {[styles.boardWrapperWin95]: themeStore.theme === Theme.Win95},
        )}>
            {cells}
        </div>
    );
});

export default ShowBoard;
