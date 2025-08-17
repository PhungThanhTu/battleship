import "./custom-input.styles.scss";
import { HTMLProps } from "react";

export type InputProps = HTMLProps<HTMLInputElement>;

function CustomInput(props: Readonly<InputProps>) {
    return <input className="custom-input" {...props} />;
}

export default CustomInput;
