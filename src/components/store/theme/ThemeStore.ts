import { makeAutoObservable } from "mobx"
import {Theme} from "../../interfaces/Theme";

class ThemeStore {
    theme = Theme.Black;

    constructor() {
        makeAutoObservable(this)
    }

    switchTheme(theme: Theme) {
        this.theme = theme;
    }
}

export default ThemeStore;
