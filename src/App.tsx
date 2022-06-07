import React from 'react';
import './App.css';

import Board from "./components/Board/Board";
import ThemeStore from "./theme/ThemeStore";

const themeStore = new ThemeStore();

function App() {
    return (
        <div className="App">
            <Board themeStore={themeStore} />
        </div>
    );
}

export default App;
