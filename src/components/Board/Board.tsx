import React, {useState} from "react";
import {getBoard, showCongrats} from "../../utils/common/common";
import {ICell} from "../../interfaces/interfaces";
import {PieceColor} from "../../utils/consts/piece";
import {BOARD_SIZE, NUMBER_OF_PIECES} from "../../utils/consts/board";
import canBeat from "../../utils/moves/canBeat";
import canMove from "../../utils/moves/canMove";
import {beatPiece, isMinePiece, isSamePiece, movePiece} from "../../utils/board/board";
import ShowBoard from "./ShowBoard";

import styles from "./Board.module.scss";
import ThemeStore from "../../store/theme/ThemeStore";
import {observer} from "mobx-react-lite";
import Menu from "../Menu/Menu";
import GameStore from "../../store/game/GameStore";
import Score from "../Score/Score";
import useWindowSize from "../../utils/hooks/useWindowSize";
import {SCREEN_SIZE} from "../../utils/consts/consts";

export interface IBoard {
    themeStore: ThemeStore;
    gameStore: GameStore;
}

const Board: React.FC<IBoard> = observer((props): JSX.Element => {
    const {
        themeStore,
        gameStore,
    } = props;

    const {
        beatByBlack,
        beatByWhite,
    } = gameStore;

    const { width: screenWidth } = useWindowSize();

    const [currentPiece, setCurrentPiece] = useState<ICell | null>(null);
    const [updateBoard, setUpdateBoard] = useState<boolean>(false);
    const [board, setBoard] = useState<ICell[]>(getBoard(BOARD_SIZE));

    const [activeSide, setActiveSide] = useState<PieceColor>(PieceColor.White);
    const [canBeatAgain, setCanBeatAgain] = useState<boolean>(false);

    const onCellClick = (selectedPiece: ICell): void => {
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
    };

    const resetGame = (): void => {
        setCurrentPiece(null);
        setUpdateBoard(false);
        setBoard(getBoard(BOARD_SIZE));

        setActiveSide(PieceColor.White);
        setCanBeatAgain(false);

        gameStore.addBeatByBlack([]);
        gameStore.addBeatByWhite([]);
    }

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
                            {showCongrats(beatByWhite)}
                        </h2>

                    ) : (
                        <h2 className={styles.title}>
                            Whose turn: {activeSide}
                        </h2>
                    )
                }
            </div>
            <div className={styles.container}>
                {screenWidth > SCREEN_SIZE.tablet && (
                    <Score
                        title="Beaten by black:"
                        themeStore={themeStore}
                        beatenPieces={beatByBlack}
                    />
                )}
                <ShowBoard
                    board={board}
                    currentPiece={currentPiece}
                    onCellClick={onCellClick}
                    themeStore={themeStore}
                />
                {screenWidth > SCREEN_SIZE.tablet && (
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

export default Board;
