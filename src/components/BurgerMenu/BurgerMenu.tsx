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
                styles.burgerMenu__item,
                styles.burgerMenu__firstLine,
                {[ styles.burgerMenu__firstLine_open ]: isOpen}
            )} />
            <div className={clsx(
                styles.burgerMenu__item,
                styles.burgerMenu__secondLine,
                {[ styles.burgerMenu__secondLine_open ]: isOpen}
            )} />
            <div className={clsx(
                styles.burgerMenu__item,
                styles.burgerMenu__thirdLine,
                {[ styles.burgerMenu__thirdLine_open ]: isOpen}
            )} />
        </div>
    );
};

export default BurgerMenu;
