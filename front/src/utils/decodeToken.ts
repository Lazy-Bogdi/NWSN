import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
    gravatarUrl: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        console.error('Erreur dans le décodage du token', error);
        return null;
    }
};
