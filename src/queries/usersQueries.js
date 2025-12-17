import { useQuery } from "@tanstack/react-query"
import { requestMe } from "../apis/users/usersApi"

export const useMeQuery = () => {
    const accessToken = localStorage.getItem("AccessToken");
    return useQuery({
        queryKey: ["me", accessToken],
        queryFn: async () => await requestMe(),
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    });
}