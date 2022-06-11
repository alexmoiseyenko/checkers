import clsx from "clsx";
import {observer} from "mobx-react-lite";

import styles from "./Board.module.scss";
import Piece from "../Piece/Piece";
import React, {useMemo} from "react";
import {CellProps} from "../../interfaces/interfaces";
import ThemeStore from "../../store/theme/ThemeStore";
import {Theme} from "../../enums/Theme";
import {
    CELL_SIZE_DESKTOP_PX,
    CELL_SIZE_DESKTOP_XL_PX,
    CELL_SIZE_LAPTOP_PX,
    CELL_SIZE_MOBILE_PX,
    CELL_SIZE_PX,
    CELL_SIZE_TABLET_PX
} from "../../utils/consts/board";
import useWindowSize from "../../utils/hooks/useWindowSize";
import {SCREEN_SIZE} from "../../utils/consts/consts";

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

    const { width: screenWidth } = useWindowSize();

    const cells: JSX.Element[] = [];

    let colPosition = 0;
    let rowPosition = 0;

    const cellSize = useMemo(() => {
        if (screenWidth <= SCREEN_SIZE.mobile) {
            return CELL_SIZE_MOBILE_PX;
        }

        if (screenWidth <= SCREEN_SIZE.tablet) {
            return CELL_SIZE_TABLET_PX;
        }

        if (screenWidth <= SCREEN_SIZE.laptop) {
            return CELL_SIZE_LAPTOP_PX;
        }

        if (screenWidth <= SCREEN_SIZE.desktop) {
            return CELL_SIZE_DESKTOP_PX;
        }

        if (screenWidth <= SCREEN_SIZE.desktopXL) {
            return CELL_SIZE_DESKTOP_XL_PX;
        }

        return CELL_SIZE_PX;
    }, [screenWidth]);

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
                        top: `${rowPosition}px`,
                        left: `${colPosition}px`,
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
            rowPosition += cellSize;
        } else {
            colPosition += cellSize;
        }
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
