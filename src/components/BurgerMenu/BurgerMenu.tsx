import React from "react";
import styles from "./BurgerMenu.module.scss";
import clsx from "clsx";

interface BurgerMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = (props) => {
    const { isOpen, setIsOpen } = props;

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className={styles.burgerMenu}
        >
            <div
                className={clsx(
                    styles.burgerMenuLine,
                    {[ styles.active ]: isOpen}
                )}
            />
        </div>
    );
};

export default BurgerMenu;
