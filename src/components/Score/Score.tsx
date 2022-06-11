import React from "react";
import styles from "./Score.module.scss";
import Piece from "../Piece/Piece";
import ThemeStore from "../../store/theme/ThemeStore";
import {CellProps} from "../../interfaces/interfaces";

interface ScoreProps {
    title: string;
    themeStore: ThemeStore;
    beatenPieces: CellProps[];
}

const Score: React.FC<ScoreProps> = (props): JSX.Element => {
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
