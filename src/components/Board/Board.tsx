import clsx from "clsx";
import { observer } from "mobx-react-lite";

import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import React, { useMemo } from "react";
import { CellProps } from "../../interfaces/interfaces";
import ThemeStore from "../../store/theme/ThemeStore";
import { Theme } from "../../enums/Theme";
import useWindowSize from "../../utils/hooks/useWindowSize";

interface BoardProps {
    board: CellProps[];
    currentPiece: CellProps | null;
    onCellClick: (cell: CellProps) => void;
    themeStore: ThemeStore;
}

const CELL_SIZE_IN_PERCENTS = 12.5;

const Board: React.FC<BoardProps> = observer((props): JSX.Element => {
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
                    key={`row-${row} col-${col}`}
                    onClick={() => onCellClick(currentCell)}
                    data-cell={`row-${row} col-${col}`}
                    style={{
                        top: `${rowPosition}%`,
                        left: `${colPosition}%`,
                    }}
                    className={clsx(
                        styles.cell,
                        {[styles.cellBlack]: isBlackCell},
                        {[styles.cell_active]: isActiveCell},
                        {[styles.blackTheme]: themeStore.theme === Theme.Black},
                        {[styles.win95Theme]: themeStore.theme === Theme.Win95},
                    )}
                >
                    {piece && (
                        <Piece
                            color={piece.color}
                            state={piece.state}
                            themeStore={themeStore}
                        />
                    )}
                </div>
            );
        }

        if (currentCell.col >= Math.sqrt(board.length) - 1) {
            colPosition = 0;
            rowPosition += CELL_SIZE_IN_PERCENTS;
        } else {
            colPosition += CELL_SIZE_IN_PERCENTS;
        }
    }

    const {
        height: screenHeight,
        width: screenWidth,
    } = useWindowSize();

    const boardSize = useMemo(() => {
        return screenWidth > screenHeight ?
            screenHeight : screenWidth;
    }, [screenWidth, screenHeight]);

    return (
        <div
            style={{
                width: boardSize,
                height: boardSize,
            }}
            className={styles.boardWrapper}
        >
            <div className={clsx(
                styles.board,
                {[styles.boardWin95]: themeStore.theme === Theme.Win95},
            )}>
                {cells}
            </div>
        </div>
    );
});

export default Board;
