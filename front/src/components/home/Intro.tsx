import React from 'react';

const Intro: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-700  rounded-lg h-full ">
            <h1 className="text-4xl font-bold mb-4 " >Bienvenue sur notre réseau social</h1>
            <p className="text-lg text-slate-300">
                C'est un endroit où vous pouvez partager vos pensées, vous connecter avec des amis et rester à jour avec les dernières publications.
                Notre objectif est de créer un environnement sûr et engageant pour que chacun puisse s'exprimer librement.
            </p>
        </div>
    );
};

export default Intro;
