import React from "react";
import styles from "./Piece.module.scss";
import {PieceProps} from "../../interfaces/interfaces";
import clsx from "clsx";
import {PieceColor, PieceState} from "../../utils/consts/piece";
import Crown from "../Crown/Crown";
import {observer} from "mobx-react-lite";
import {Theme} from "../../enums/Theme";
import ThemeStore from "../../store/theme/ThemeStore";

interface PiecePropsWithStore extends PieceProps {
    themeStore: ThemeStore,
}

const Piece: React.FC<PiecePropsWithStore> = observer((props): JSX.Element => {
    const { color, state, themeStore } = props;
    return (
        <div className={clsx(
            styles.piece,
            {[styles.pieceWhite]: color === PieceColor.White},
            {[styles.win95Theme]: color === PieceColor.White &&
                themeStore.theme === Theme.Win95},
        )}>
            <div className={clsx(
                styles.pieceBorder,
                {[styles.pieceBorderWhite]: color === PieceColor.White},
            )}>
                {state === PieceState.King && (
                    <Crown width={30} height={30} fill={color === PieceColor.Black ? "#fff" : "#000"} />
                )}
            </div>
        </div>
    );
});

export default Piece;
