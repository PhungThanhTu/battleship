import { ReactNode, useContext } from "react";
import Header from "../components/shared/header/header.component";
import { AuthContext } from "../contexts/auth.context";
import "./single-form.style.scss";

function SingleForm({ children }: Readonly<{ children: ReactNode }>) {
    const authContextProps = useContext(AuthContext);

    return (
        <>
            <Header {...authContextProps} />
            <div className="single-layout-container">{children}</div>
        </>
    );
}

export default SingleForm;
