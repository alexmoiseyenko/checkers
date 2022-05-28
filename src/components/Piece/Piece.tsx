import React from "react";
import styles from "./Piece.module.scss";
import {IPiece} from "../../interfaces/interfaces";
import clsx from "clsx";
import {PieceColor} from "../../utils/consts/Piece";

const Piece: React.FC<IPiece> = (props): JSX.Element => {
    const { color, state } = props;
    return (
        <div className={clsx(
            styles.piece,
            {[styles.piece_white]: color === PieceColor.White},
        )}>
            <div className={clsx(
                styles.pieceBorder,
                {[styles.pieceBorder_white]: color === PieceColor.White},
            )} />
        </div>
    );
};

export default Piece;
