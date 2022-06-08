import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface IButton {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

const Button: React.FC<IButton> = (props) => {
    const { className, onClick, children,  } = props;
    return (
        <button
            className={clsx(
                styles.button,
                className,
            )}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;
