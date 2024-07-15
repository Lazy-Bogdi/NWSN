import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
    isOpen: boolean;
    title: string,
    message: string;
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, closeModal  }) => {
    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="mb-4">{message}</p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        closeModal();
                        navigate('/');                        
                    }}
                >
                    Connexion
                </button>
            </div>
        </div>
    );
};

export default Modal;
