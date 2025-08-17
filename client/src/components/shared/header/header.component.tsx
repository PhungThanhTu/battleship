import { AuthState } from "../../../hooks/auth.hook";
import CustomButton from "../custom-button/custom-button.component";
import "./header.style.scss";

export type HeaderProps = AuthState;

function Header(props: Readonly<HeaderProps>) {
    const { profile, logOut } = props;

    if (!profile || !logOut) return null;

    function handleLogOut() {
        logOut();
    }

    return (
        <header className="header-container">
            <nav>
                <h3>#{profile.username}</h3>
                <h2>🚢 Battleship Online 🚢</h2>
                <CustomButton onClick={handleLogOut}>Log out</CustomButton>
            </nav>
        </header>
    );
}

export default Header;
