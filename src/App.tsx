import React from 'react';
import styles from './App.module.css';

import Board from "./components/Board/Board";
import ThemeStore from "./store/theme/ThemeStore";
import {observer} from "mobx-react-lite";
import clsx from "clsx";
import {Theme} from "./enums/Theme";
import GameStore from "./store/game/GameStore";

const themeStore = new ThemeStore();
const gameStore = new GameStore();

const App = observer(() => {
    const { theme } = themeStore;
    return (
        <div className={clsx(
            styles.App,
            {[ styles.AppWin95]: theme === Theme.Win95 }
        )}>
            <Board
                themeStore={themeStore}
                gameStore={gameStore}
            />
        </div>
    );
});

export default App;
