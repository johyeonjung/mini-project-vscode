import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeQuery } from "../../queries/usersQueries";

function OAuth2() {
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken"); //get요청 때 보내진 쿼리파라미터를 가져옴

    if (!!accessToken) {
            localStorage.setItem("AccessToken", accessToken);
    }
    const meQuery = useMeQuery();

    useEffect(() => {
        console.log(meQuery.data);
        console.log(meQuery.isLoading);
        console.log(meQuery.isSuccess);
        const {isLoading, data} = meQuery;
        if (!isLoading) {
            if (data.status !== 200) {
                alert("인증이 필요합니다.");
                navigate("/auth/login");
            } else {
                alert ("로그인 성공");
                navigate("/");
            }
        }
    }, [meQuery.data]);

    return <></>
}

export default OAuth2;