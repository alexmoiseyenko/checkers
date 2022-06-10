import React from "react";
import styles from "./Score.module.scss";
import Piece from "../Piece/Piece";
import ThemeStore from "../store/theme/ThemeStore";
import {ICell} from "../../interfaces/interfaces";

interface IScore {
    title: string;
    themeStore: ThemeStore;
    beatenPieces: ICell[];
}

const Score: React.FC<IScore> = (props): JSX.Element => {
    const {
        title,
        themeStore,
        beatenPieces,
    } = props;

    return (
        <div className={styles.score}>
            <h2 className={styles.title}>
                {title}
            </h2>
            <ul className={styles.beatenPieces}>
                {beatenPieces.map(({ piece }) => {
                    return piece && (
                        <li>
                            <Piece
                                color={piece.color}
                                state={piece.state}
                                themeStore={themeStore}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Score;
