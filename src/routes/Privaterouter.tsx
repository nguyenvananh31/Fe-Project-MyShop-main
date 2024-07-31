import { useEffect, useState, type ReactElement } from "react";
import { Navigate } from "react-router";
import { Iusers } from "../InterFace/users";

interface Props {
    children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            try {
                const users: Iusers = JSON.parse(user);
                if (users.role === "admin") {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Máy chủ bị lỗi", error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return isAuthenticated ? children : <Navigate to="/auth-sigin" />;
};
    

export default PrivateRoute;