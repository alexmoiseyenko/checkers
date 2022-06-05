import React, {useState} from "react";
import {getBoard} from "../../utils/common/common";
import {ICell} from "../../interfaces/interfaces";
import {PieceColor, PieceState} from "../../utils/consts/Piece";
import {BOARD_SIZE} from "../../utils/consts/board";
import canBeat from "../../utils/moves/canBeat";
import canMove from "../../utils/moves/canMove";
import {beatPiece, isMinePiece, isSamePiece, isShouldBecomeKing, movePiece} from "../../utils/board/board";
import ShowBoard from "./ShowBoard";

export interface IBoard {
    size?: number;
}

const Board: React.FC<IBoard> = (): JSX.Element => {
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
            if (canBeatAgain) {
                if (canBeat(currentPiece, selectedPiece, board)) {
                    setCanBeatAgain(false);
                    beatPiece(
                        board,
                        currentPiece,
                        selectedPiece,
                        updateBoard,
                        activeSide,
                        setCurrentPiece,
                        setActiveSide,
                        setBoard,
                        setUpdateBoard,
                        setCanBeatAgain,
                        canBeatAgain
                    )
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
                    setCurrentPiece,
                    setActiveSide,
                    setBoard,
                    setUpdateBoard,
                    setCanBeatAgain,
                )
            }
        }
    };

    return (
        <>
            <h2>
                Whose turn: {activeSide}
            </h2>
            <ShowBoard
                board={board}
                currentPiece={currentPiece}
                onCellClick={onCellClick}
            />
        </>
    )
};

export default Board;
