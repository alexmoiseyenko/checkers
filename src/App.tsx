import React from 'react';
import styles from './App.module.css';

import Board from "./components/Board/Board";
import ThemeStore from "./theme/ThemeStore";
import {observer} from "mobx-react-lite";
import clsx from "clsx";
import {Theme} from "./theme/Theme";

const themeStore = new ThemeStore();

const App = observer(() => {
    const { theme } = themeStore;
    return (
        <div className={clsx(
            styles.App,
            {[ styles.AppWin95]: theme === Theme.Win95 }
        )}>
            <Board themeStore={themeStore} />
        </div>
    );
});

export default App;
