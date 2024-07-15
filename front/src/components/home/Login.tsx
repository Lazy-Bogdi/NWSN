import React from 'react';

const Login: React.FC = () => {
    const handleLogin = () => {
        window.location.href = 'https://127.0.0.1:8000/connect/google'; // Update with your Symfony app domain
    };

    return (
        <div className="flex flex-col bg-slate-300 items-center justify-center p-8 h-full w-full">
            <h1 className="text-4xl text-slate-700 font-bold mb-4 ">
                Connexion
            </h1>
            <button className="btn btn-primary" onClick={handleLogin}>
                Connexion Google
            </button>
        </div>
    );
};

export default Login;
