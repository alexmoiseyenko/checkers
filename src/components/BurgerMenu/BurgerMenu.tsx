import React from "react";
import styles from "./BurgerMenu.module.scss";
import clsx from "clsx";

interface IButton {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const BurgerMenu: React.FC<IButton> = (props) => {
    const { isOpen, setIsOpen } = props;

    return (
        <div
            onClick={() => setIsOpen(!isOpen)}
            className={styles.burgerMenu}
        >
            <div className={clsx(
                styles.burgerMenuLine,
                {[ styles.burgerMenuLineActive ]: isOpen}
            )} />
            <div className={clsx(
                styles.burgerMenuLine,
                {[ styles.burgerMenuSecondLineActive ]: isOpen}
            )} />
            <div className={clsx(
                styles.burgerMenuLine,
                {[ styles.burgerMenuThirdLineActive ]: isOpen}
            )} />
        </div>
    );
};

export default BurgerMenu;
