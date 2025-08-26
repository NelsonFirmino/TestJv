import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SharedState } from "./context/SharedContext";
import { Router } from "./Routes";

export const App = () => {
    const navigate = useNavigate();
    const { user, setUser } = SharedState();
    const lastInteraction = useRef(Date.now());
    const timeToExpire = +process.env.REACT_APP_TIME_SESSION; // 10 minutos em milissegundos

    const handleUserActivity = () => {
        lastInteraction.current = Date.now();
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("click", handleUserActivity);
        window.addEventListener("keydown", handleUserActivity);

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const timeSinceLastInteraction =
                currentTime - lastInteraction.current;
            const isSessionExpired = user && currentTime > user.exp * 1000;
            if (timeSinceLastInteraction >= timeToExpire || isSessionExpired) {
                localStorage.clear();
                setUser(null);
                toast.error(
                    "Sessão do usuário expirada! Faça login novamente.",
                    {
                        icon: "❌",
                        style: {
                            borderRadius: "10px",
                            background: "#e57373",
                            color: "#fff",
                            fontSize: "30px"
                        }
                    }
                );
                navigate("/");
            }
        }, 30 * 1000);

        return () => {
            window.removeEventListener("mousemove", handleUserActivity);
            window.removeEventListener("click", handleUserActivity);
            window.removeEventListener("keydown", handleUserActivity);
            clearInterval(interval);
        };
    }, [user, setUser, navigate]);

    return <Router />;
};

export default App;
