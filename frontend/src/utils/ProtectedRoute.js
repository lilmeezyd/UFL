import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute({
    isAllowed,
    children,
    redirectPath = '/login'}) {


    if(!isAllowed) {
        return <Navigate to={redirectPath} replace />
    }
  return children ? children : <Outlet />
}

export default ProtectedRoute