import React, {useState} from "react";
import styles from "./Menu.module.scss";
import {Theme} from "../../theme/Theme";
import {observer} from "mobx-react-lite";
import ThemeStore from "../../theme/ThemeStore";
import Button from "../Button/Button";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import clsx from "clsx";

interface IMenu {
    resetGame: () => void;
    themeStore: ThemeStore;
}

const Menu: React.FC<IMenu> = observer((props) => {
    const { resetGame, themeStore } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <BurgerMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <div className={clsx(
                styles.menu,
                {[styles.menuActive]: isOpen }
            )}>
                <Button className={styles.button} onClick={resetGame}>
                    Start new game
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => themeStore.switchTheme(Theme.Black)}
                >
                    Set black theme
                </Button>
                <Button
                    className={styles.button}
                    onClick={() => themeStore.switchTheme(Theme.Win95)}
                >
                    Set win95 theme
                </Button>
            </div>
        </div>
    );
});

export default Menu;
