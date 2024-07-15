import React from 'react';

interface TopBarProps {
    username: string;
    gravatarUrl: string;
}

const TopBar: React.FC<TopBarProps> = ({ username, gravatarUrl }) => {
    return (
        <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="text-white text-lg font-bold">NWS Social Network</div>
            <div className="flex items-center">
                <img src={gravatarUrl} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                <span className="text-white">{username}</span>
            </div>
        </div>
    );
};

export default TopBar;
