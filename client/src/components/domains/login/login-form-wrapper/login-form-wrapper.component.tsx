import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentRoom } from "../../../../api/axios/domains/room/room.api";
import { AuthContext } from "../../../../contexts/auth.context";
import LoginForm from "../login-form/login-form.component";

export function LoginFormWrapper() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    async function onLogin() {
        try {
            await login(username);
            try {
                const room = await getCurrentRoom();
                if (room) {
                    navigate(`/room/${room.roomId}`);
                } else {
                    navigate("/");
                }
            } catch {
                navigate("/");
            }
        } catch {
            alert("Login failed");
        }
    }

    return <LoginForm onUsernameChange={setUsername} onLogin={onLogin} username={username} />;
}
