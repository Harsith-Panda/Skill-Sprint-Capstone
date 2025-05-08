import { Navigate } from "react-router";
import { useStore } from "../config/store/store";

type Children = {
    children : React.ReactNode;
}

export const ProtectedRoutes = ({children}: Children) => {
    const user = useStore(state => state.user);

    return (
        (user === null) ? <Navigate to={'/login'} replace /> : children
    )
}