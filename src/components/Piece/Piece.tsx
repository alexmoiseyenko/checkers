import React from "react";
import styles from "./Piece.module.scss";
import {PieceColor, PieceState} from "../../../utils/consts/Piece";

interface IPiece {
    color: PieceColor,
    state: PieceState,
}

const Piece = (): JSX.Element => {
    return (
        <div className={styles.piece}>
            <div className={styles.pieceBorder}>

            </div>
        </div>
    );
};

export default Piece;
