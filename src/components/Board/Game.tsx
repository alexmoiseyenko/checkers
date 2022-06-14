import React, {useCallback, useEffect, useState} from "react";
import { getBoard, getCongratsText } from "../../utils/common/common";
import { CellProps } from "../../interfaces/interfaces";
import { PieceColor } from "../../utils/consts/piece";
import { BOARD_SIZE_IN_CELLS, NUMBER_OF_PIECES } from "../../utils/consts/board";
import canBeat from "../../utils/moves/canBeat";
import canMove from "../../utils/moves/canMove";
import {
    beatPiece,
    canBeatPieceAgain,
    isMinePiece,
    isSamePiece,
    movePiece,
    switchSide
} from "../../utils/board/board";
import Board from "./Board";

import styles from "./Board.module.scss";
import ThemeStore from "../../store/theme/ThemeStore";
import { observer } from "mobx-react-lite";
import Menu from "../Menu/Menu";
import GameStore from "../../store/game/GameStore";
import Score from "../Score/Score";
import useWindowSize from "../../utils/hooks/useWindowSize";
import { SCREEN_SIZE } from "../../utils/consts/consts";
import mustBeat from "../../utils/moves/mustBeat";

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
    const [board, setBoard] = useState<CellProps[]>(getBoard(BOARD_SIZE_IN_CELLS));

    const [activeSide, setActiveSide] = useState<PieceColor>(PieceColor.White);
    const [mustBeatAgain, setMustBeatAgain] = useState<boolean>(false);

    const processBeatPiece = useCallback((selectedPiece: CellProps, currentPiece: CellProps): void => {
        const commonParams = {
            board,
            currentPiece,
            selectedPiece,
        };

        const newBoard = beatPiece(
            commonParams,
            beatByWhite,
            beatByBlack,
            mustBeatAgain,
        );

        setBoard(newBoard);
        setUpdateBoard(!updateBoard);

        const canBeat = canBeatPieceAgain(selectedPiece, newBoard);

        if (canBeat) {
            setMustBeatAgain(true);
            setCurrentPiece({
                ...selectedPiece,
                piece: currentPiece.piece
            });
        } else {
            setMustBeatAgain(false);
            setCurrentPiece(null);

            switchSide(activeSide, setActiveSide);
        }
    }, [activeSide, beatByBlack, beatByWhite, board, mustBeatAgain, updateBoard]);

    useEffect(() => {
        for (let i = 0; i < board.length; i++) {
            const currentPiece = board[i];
            if (currentPiece?.piece &&
                currentPiece.piece.color === activeSide &&
                mustBeat(currentPiece, board)
            ) {
                setMustBeatAgain(true);
            }
        }
    }, [updateBoard]);

    const onCellClick = useCallback((selectedPiece: CellProps): void => {
        if (mustBeatAgain) {
            const shouldSetPieceActive = selectedPiece.piece &&
                selectedPiece.piece.color === activeSide &&
                mustBeat(selectedPiece, board)
            if (shouldSetPieceActive) {
                setCurrentPiece(selectedPiece);
            } else if (currentPiece && canBeat(currentPiece, selectedPiece, board)) {
                processBeatPiece(selectedPiece, currentPiece);
            }
        } else if (selectedPiece.piece && !currentPiece) {
            if (selectedPiece.piece.color === activeSide) {
                setCurrentPiece(selectedPiece);
            }
        } else if (currentPiece) {
            if (isMinePiece(selectedPiece, currentPiece)) {
                if (isSamePiece(selectedPiece, currentPiece)) {
                    setCurrentPiece(null);
                } else {
                    setCurrentPiece(selectedPiece);
                }
            } else if (canMove(currentPiece, selectedPiece, board, activeSide)) {
                const commonParams = {
                    board,
                    currentPiece,
                    selectedPiece,
                };

                const updatedBoard = movePiece(commonParams);
                setBoard(updatedBoard);
                setCurrentPiece(null);
                setUpdateBoard(!updateBoard);
                switchSide(activeSide, setActiveSide);
            } else if (canBeat(currentPiece, selectedPiece, board)) {
                processBeatPiece(selectedPiece, currentPiece);
            }
        }
    }, [activeSide, updateBoard, board, currentPiece, mustBeatAgain]);

    const resetGame = useCallback((): void => {
        setCurrentPiece(null);
        setUpdateBoard(false);
        setBoard(getBoard(BOARD_SIZE_IN_CELLS));

        setActiveSide(PieceColor.White);
        setMustBeatAgain(false);

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
