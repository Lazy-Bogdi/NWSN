import React, { createContext, useContext, useState, useEffect } from 'react';
import eventEmitter from '../utils/eventEmitter';

interface ModalContextProps {
    isOpen: boolean;
    title: string;
    message: string;
    openModal: (title: string, message: string) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

    const openModal = (title: string, message: string) => {
        setTitle(title);
        setMessage(message);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setTitle('');
        setMessage('');
    };

    useEffect(() => {
        const handleUnauthorized = () => openModal('Session Expirée', 'Vous n\'êtes pas connecté. Merci de bine vouloir vous reconnecter.');
        eventEmitter.on('unauthorized', handleUnauthorized);

        return () => {
            eventEmitter.off('unauthorized', handleUnauthorized);
        };
    }, []);

    return (
        <ModalContext.Provider value={{ isOpen, title, message, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
