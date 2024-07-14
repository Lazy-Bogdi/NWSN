import React from 'react';
import Intro from './Intro';
import Login from './Login';
// import styles from './home.module.css';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-700">
            <div className="p-4">
                <Intro />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-slate-300">
                <Login />
            </div>
        </div>
    );
};

export default Home;
