import React from "react";
import styles from "./Piece.module.scss";
import {IPiece} from "../../interfaces/interfaces";
import clsx from "clsx";
import {PieceColor, PieceState} from "../../utils/consts/Piece";
import Crown from "../Crown/Crown";
import {observer} from "mobx-react-lite";
import {Theme} from "../interfaces/Theme";
import ThemeStore from "../store/theme/ThemeStore";

interface IPieceWithStore extends IPiece {
    themeStore: ThemeStore,
}

const Piece: React.FC<IPieceWithStore> = observer((props): JSX.Element => {
    const { color, state, themeStore } = props;
    return (
        <div className={clsx(
            styles.piece,
            {[styles.piece_white]: color === PieceColor.White},
            {[styles.win95Piece_white]: color === PieceColor.White &&
                themeStore.theme === Theme.Win95},
        )}>
            <div className={clsx(
                styles.pieceBorder,
                {[styles.pieceBorder_white]: color === PieceColor.White},
            )}>
                {state === PieceState.King && (
                    <Crown width={30} height={30} fill={color === PieceColor.Black ? "#fff" : "#000"} />
                )}
            </div>
        </div>
    );
});

export default Piece;
