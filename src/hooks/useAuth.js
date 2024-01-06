import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { selectCurrentToken } from '../features/auth/authSlice';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isAdmin = false;
    let isCustomer = false;

    if (token) {
        const decoded = jwtDecode(token);
        const { id, username, role } = decoded.UserInfo;

        isAdmin = (role === "Admin");
        isCustomer = (role === "Customer");

        return { id, username, role, isAdmin, isCustomer};
    }

    return { id: '', username: '', role: '', isAdmin, isCustomer};
};

export default useAuth