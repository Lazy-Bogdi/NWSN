import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../contexts/ModalContext';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const { openModal } = useModal();
    // const { login } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const error = urlParams.get('error');

        if (token) {
            localStorage.setItem('jwt_token', token);
            navigate('/board'); // Redirect to your desired route
        }  else if (error) {
            if(error ==='No "code" parameter was found (usually this is a query parameter)!'){
                openModal('Connexion annulée', 'Vous avez annulé la connexion');
            }else{
                openModal('Erreur d\'authtentification', error);
            }
             // Show the error message in a modal with a proper title
        }else{
            console.log('wweird')
        }
    }, [navigate, openModal]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
