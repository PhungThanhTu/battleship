import { ChangeEvent } from "react";
import CustomButton from "../../../shared/custom-button/custom-button.component";
import CustomInput from "../../../shared/custom-input/custom-input.component";
import "./login-form.style.scss";

export type LoginFormProps = {
    username: string;
    onUsernameChange: (username: string) => void;
    onLogin: () => Promise<void>;
};

function LoginForm({ username, onUsernameChange, onLogin }: Readonly<LoginFormProps>) {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        onUsernameChange(newUsername);
    };

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onLogin();
    };

    return (
        <div>
            <form onSubmit={onSubmit} className="login-form">
                <CustomInput onChange={onInputChange} value={username} type="text" placeholder="username" />
                <CustomButton type="submit">Join</CustomButton>
            </form>
        </div>
    );
}

export default LoginForm;
