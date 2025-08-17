import "./custom-button.style.scss";
import { HTMLProps } from "react";

type ButtonTypes = "submit" | "reset" | "button";
export type ButtonProps = HTMLProps<HTMLButtonElement> & { type?: ButtonTypes };

function CustomButton({ type = "submit", ...props }: Readonly<ButtonProps>) {
    return (
        <button type={type} className="bs-button" {...props}>
            {props.children}
        </button>
    );
}

export default CustomButton;
