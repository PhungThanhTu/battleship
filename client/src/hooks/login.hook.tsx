import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

function useLogin() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    function navigateToDashboard() {
        return navigate("/");
    }

    async function onLogin() {
        try {
            await login(username);
            return navigateToDashboard();
        } catch {
            return alert("Login failed");
        }
    }

    return {
        username,
        setUsername,
        login: onLogin
    };
}

export default useLogin;
