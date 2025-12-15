import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function OAuth2() {
    const [ searchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken");
    useEffect(() => {
        console.log(accessToken);
        if(!!accessToken){
            alert("로그인 성공!");
        } else {
             alert("로그인 후 이용");
             Navigate("/auth/login");
        }
    },[accessToken]);
    
    return <></>
}

export default OAuth2;