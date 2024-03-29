import decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/actions';

const  AuthService {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    getProfile() {
        const token = this.getToken();
        if (token) {
            return decode(token);
        }
        return null;
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            console.error('Failed to decode token:', err);
            return true;
        }
    }

    getToken() {
        const token = localStorage.getItem('id_token');
        if (token && !this.isTokenExpired(token)) {
            return token;
        }
        localStorage.removeItem('id_token');
        return null;
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();
