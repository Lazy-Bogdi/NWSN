import React from 'react';

interface ProfilePictureProps {
    gravatarUrl: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ gravatarUrl }) => {
    return <img src={gravatarUrl} alt="Profile" className="w-10 h-10 rounded-full" />;
};

export default ProfilePicture;
