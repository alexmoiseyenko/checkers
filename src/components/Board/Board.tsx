import React, {useState} from "react";
import {getBoard} from "../../utils/common/common";
import {ICell} from "../../interfaces/interfaces";
import {PieceColor} from "../../utils/consts/Piece";
import {BOARD_SIZE} from "../../utils/consts/board";
import canBeat from "../../utils/moves/canBeat";
import canMove from "../../utils/moves/canMove";
import {beatPiece, isMinePiece, isSamePiece, movePiece} from "../../utils/board/board";
import ShowBoard from "./ShowBoard";
import Piece from "../Piece/Piece";

import styles from "./Board.module.scss";

export interface IBoard {
    size?: number;
}

const Board: React.FC<IBoard> = (): JSX.Element => {
    const [currentPiece, setCurrentPiece] = useState<ICell | null>(null);
    const [updateBoard, setUpdateBoard] = useState<boolean>(false);
    const [board, setBoard] = useState<ICell[]>(getBoard(BOARD_SIZE));

    const [activeSide, setActiveSide] = useState<PieceColor>(PieceColor.White);
    const [canBeatAgain, setCanBeatAgain] = useState<boolean>(false);

    const [beatByBlack, setBeatByBlack] = useState<ICell[]>([]);
    const [beatByWhite, setBeatByWhite] = useState<ICell[]>([]);

    const onCellClick = (selectedPiece: ICell): void => {
        if (selectedPiece.piece && !currentPiece) {
            if (selectedPiece.piece.color === activeSide) {
                setCurrentPiece(selectedPiece);
            }
        } else if (selectedPiece.isBlackCell && currentPiece) {
            if (canBeatAgain) {
                if (canBeat(currentPiece, selectedPiece, board)) {
                    setCanBeatAgain(false);
                    beatPiece(
                        board,
                        currentPiece,
                        selectedPiece,
                        updateBoard,
                        activeSide,
                        beatByWhite,
                        beatByBlack,
                        setCurrentPiece,
                        setActiveSide,
                        setBoard,
                        setUpdateBoard,
                        setCanBeatAgain,
                        setBeatByWhite,
                        setBeatByBlack,
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
                movePiece(
                    board,
                    currentPiece,
                    selectedPiece,
                    updateBoard,
                    activeSide,
                    setBoard,
                    setCurrentPiece,
                    setUpdateBoard,
                    setActiveSide,
                );
            } else if (canBeat(currentPiece, selectedPiece, board)) {
                beatPiece(
                    board,
                    currentPiece,
                    selectedPiece,
                    updateBoard,
                    activeSide,
                    beatByWhite,
                    beatByBlack,
                    setCurrentPiece,
                    setActiveSide,
                    setBoard,
                    setUpdateBoard,
                    setCanBeatAgain,
                    setBeatByWhite,
                    setBeatByBlack,
                )
            }
        }
    };

    console.log("beatByBlack ", beatByBlack);

    return (
        <>
            <h2>
                Whose turn: {activeSide}
            </h2>
            <div className={styles.container}>
                <div>
                    <h2>
                        Beat by blacks:
                    </h2>
                    <ul>
                        {beatByBlack.map(({ piece }) => {
                            return piece && (
                                <li>
                                    <Piece
                                        color={piece.color}
                                        state={piece.state}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <ShowBoard
                    board={board}
                    currentPiece={currentPiece}
                    onCellClick={onCellClick}
                />
                <div>
                    <h2>
                        Beat by whites:
                    </h2>
                    <ul>
                        {beatByWhite.map(({ piece }) => {
                            return piece && (
                                <li>
                                    <Piece
                                        color={piece.color}
                                        state={piece.state}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Board;
