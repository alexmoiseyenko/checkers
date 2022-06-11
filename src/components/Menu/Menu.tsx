import React, {useState} from "react";
import styles from "./Menu.module.scss";
import {Theme} from "../../enums/Theme";
import {observer} from "mobx-react-lite";
import ThemeStore from "../../store/theme/ThemeStore";
import Button from "../Button/Button";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import clsx from "clsx";
import {SCREEN_SIZE} from "../../utils/consts/consts";
import Score from "../Score/Score";
import useWindowSize from "../../utils/hooks/useWindowSize";
import GameStore from "../../store/game/GameStore";

interface MenuProps {
    resetGame: () => void;
    themeStore: ThemeStore;
    gameStore: GameStore;
}

const Menu: React.FC<MenuProps> = observer((props) => {
    const { resetGame, themeStore, gameStore } = props;

    const {
        beatByBlack,
        beatByWhite,
    } = gameStore;

    const { width: screenWidth } = useWindowSize();

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
                <div>
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
                {screenWidth <= SCREEN_SIZE.tablet && (
                    <div>
                        <Score
                            title="Beaten by black:"
                            themeStore={themeStore}
                            beatenPieces={beatByBlack}
                        />
                        <Score
                            title="Beaten by white:"
                            themeStore={themeStore}
                            beatenPieces={beatByWhite}
                        />
                    </div>
                )}
            </div>
        </div>
    );
});

export default Menu;
