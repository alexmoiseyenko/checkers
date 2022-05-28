import React from "react";
import styles from "./Piece.module.scss";
import {PieceColor, PieceState} from "../../utils/consts/Piece";

interface IPiece {
    row?: number;
    col?: number;
    color?: PieceColor,
    state?: PieceState,
    onClick?: (e: any) => void;
}

const Piece: React.FC<IPiece> = (props): JSX.Element => {
    const { col, row, onClick } = props;
    return (
        <div
            data-row={row}
            data-col={col}
            className={styles.piece}
            onClick={onClick}>
            <div className={styles.pieceBorder}>

            </div>
        </div>
    );
};

export default Piece;
