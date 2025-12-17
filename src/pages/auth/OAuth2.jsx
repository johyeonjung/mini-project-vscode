import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeQuery } from "../../queries/usersQueries";

function OAuth2() {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken");

    if (!!accessToken) {
            localStorage.setItem("AccessToken", accessToken);
    }
    const meQuery = useMeQuery();

    useEffect(() => {
        console.log(meQuery.data)
    }, [meQuery.data]);

    return <></>
}

export default OAuth2;