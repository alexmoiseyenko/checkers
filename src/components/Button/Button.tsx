import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { className, onClick, children } = props;
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
