import clsx from "clsx";
import { observer } from "mobx-react-lite";

import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import React, { useMemo } from "react";
import { CellProps } from "../../interfaces/interfaces";
import ThemeStore from "../../store/theme/ThemeStore";
import { Theme } from "../../enums/Theme";
import useWindowSize from "../../utils/hooks/useWindowSize";
import {
    MOBILE_TOP_CONTENT_SIZE_IN_PIXELS, SIDE_CONTENT_SIZE_IN_PIXELS,
    TOP_CONTENT_SIZE_IN_PIXELS
} from "../../utils/consts/board";
import { SCREEN_SIZE } from "../../utils/consts/consts";

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

        rowPosition = CELL_SIZE_IN_PERCENTS * row;
        colPosition = CELL_SIZE_IN_PERCENTS * col;

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
    }

    const {
        height: screenHeight,
        width: screenWidth,
    } = useWindowSize();

    const boardSize = useMemo(() => {
        const isLaptopPlusSize = screenWidth > SCREEN_SIZE.laptop;
        const isWidthBiggerThanHeight = screenWidth > screenHeight;

        return isLaptopPlusSize ? (
            isWidthBiggerThanHeight ? (
                screenHeight - TOP_CONTENT_SIZE_IN_PIXELS
            ) : (
                screenWidth - SIDE_CONTENT_SIZE_IN_PIXELS
            )
        ) : (
            isWidthBiggerThanHeight ? (
                screenHeight - MOBILE_TOP_CONTENT_SIZE_IN_PIXELS
            ) : (
                screenWidth - MOBILE_TOP_CONTENT_SIZE_IN_PIXELS
            )
        );
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
