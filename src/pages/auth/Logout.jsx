import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    localStorage.removeItem("AccessToken");
    useEffect(() => {
        navigate("/auth/login");
    }, []);
    return <></>
}

export default Logout;