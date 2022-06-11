import React, {useCallback, useState} from "react";
import {getBoard, getCongratsText} from "../../utils/common/common";
import {CellProps} from "../../interfaces/interfaces";
import {PieceColor} from "../../utils/consts/piece";
import {CELLS_PER_BOAR_SIDE, NUMBER_OF_PIECES} from "../../utils/consts/board";
import canBeat from "../../utils/moves/canBeat";
import canMove from "../../utils/moves/canMove";
import {beatPiece, isMinePiece, isSamePiece, movePiece} from "../../utils/board/board";
import Board from "./Board";

import styles from "./Board.module.scss";
import ThemeStore from "../../store/theme/ThemeStore";
import {observer} from "mobx-react-lite";
import Menu from "../Menu/Menu";
import GameStore from "../../store/game/GameStore";
import Score from "../Score/Score";
import useWindowSize from "../../utils/hooks/useWindowSize";
import {SCREEN_SIZE} from "../../utils/consts/consts";

export interface GameProps {
    themeStore: ThemeStore;
    gameStore: GameStore;
}

const Game: React.FC<GameProps> = observer((props): JSX.Element => {
    const {
        themeStore,
        gameStore,
    } = props;

    const {
        beatByBlack,
        beatByWhite,
    } = gameStore;

    const { width: screenWidth } = useWindowSize();

    const [currentPiece, setCurrentPiece] = useState<CellProps | null>(null);
    const [updateBoard, setUpdateBoard] = useState<boolean>(false);
    const [board, setBoard] = useState<CellProps[]>(getBoard(CELLS_PER_BOAR_SIDE));

    const [activeSide, setActiveSide] = useState<PieceColor>(PieceColor.White);
    const [canBeatAgain, setCanBeatAgain] = useState<boolean>(false);

    const onCellClick = useCallback((selectedPiece: CellProps): void => {
        if (selectedPiece.piece && !currentPiece) {
            if (selectedPiece.piece.color === activeSide) {
                setCurrentPiece(selectedPiece);
            }
        } else if (selectedPiece.isBlackCell && currentPiece) {
            const commonParams = {
                board,
                currentPiece,
                selectedPiece,
                updateBoard,
                activeSide,
                setCurrentPiece,
                setActiveSide,
                setBoard,
                setUpdateBoard,
            };

            if (canBeatAgain) {
                if (canBeat(currentPiece, selectedPiece, board)) {
                    setCanBeatAgain(false);
                    beatPiece(
                        commonParams,
                        beatByWhite,
                        beatByBlack,
                        setCanBeatAgain,
                        canBeatAgain,
                    );
                }
            } else if (isMinePiece(selectedPiece, currentPiece)) {
                if (isSamePiece(selectedPiece, selectedPiece)) {
                    setCurrentPiece(null);
                } else {
                    setCurrentPiece(selectedPiece);
                }
            } else if (canMove(currentPiece, selectedPiece, board, activeSide)) {
                movePiece(commonParams);
            } else if (canBeat(currentPiece, selectedPiece, board)) {
                beatPiece(
                    commonParams,
                    beatByWhite,
                    beatByBlack,
                    setUpdateBoard,
                )
            }
        }
    }, [activeSide, board, currentPiece]);

    const resetGame = useCallback((): void => {
        setCurrentPiece(null);
        setUpdateBoard(false);
        setBoard(getBoard(CELLS_PER_BOAR_SIDE));

        setActiveSide(PieceColor.White);
        setCanBeatAgain(false);

        gameStore.addBeatByBlack([]);
        gameStore.addBeatByWhite([]);
    }, []);

    return (
        <div className={styles.wrapper}>
            <Menu
                resetGame={resetGame}
                themeStore={themeStore}
                gameStore={gameStore}
            />
            <div className={styles.header}>
                {
                    beatByBlack.length === NUMBER_OF_PIECES ||
                    beatByWhite.length === NUMBER_OF_PIECES ? (
                        <h2
                            className={styles.title}
                        >
                            {getCongratsText(beatByWhite)}
                        </h2>

                    ) : (
                        <h2 className={styles.title}>
                            Whose turn: {activeSide}
                        </h2>
                    )
                }
            </div>
            <div className={styles.container}>
                {screenWidth > SCREEN_SIZE.laptop && (
                    <Score
                        title="Beaten by black:"
                        themeStore={themeStore}
                        beatenPieces={beatByBlack}
                    />
                )}
                <Board
                    board={board}
                    currentPiece={currentPiece}
                    onCellClick={onCellClick}
                    themeStore={themeStore}
                />
                {screenWidth > SCREEN_SIZE.laptop && (
                    <Score
                        title="Beaten by white:"
                        themeStore={themeStore}
                        beatenPieces={beatByWhite}
                    />
                )}
            </div>
        </div>
    )
});

export default Game;