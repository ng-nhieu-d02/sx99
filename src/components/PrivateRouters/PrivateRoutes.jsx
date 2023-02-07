import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoutes() {
    const user = useSelector((state) => state.auth.login.currentUser);
    // check user login
    // run localStorage.setItem('access_token', 'abcdef') in Console Browser to set user login
    const IsLoggedIn = Boolean(user);
    return IsLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
