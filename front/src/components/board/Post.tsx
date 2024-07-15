import React from 'react';
import ProfilePicture from './ProfilePicture';

interface PostProps {
    post: {
        id: number;
        content: string;
        author: string;
        gravatarUrl: string;
        created_at: string;
    };
}

const Post: React.FC<PostProps> = ({ post }) => {
    // console.log(post)
    return (
        <div className="bg-white p-4 rounded shadow-md mb-4">
            <div className="flex items-center mb-2">
            <ProfilePicture gravatarUrl={post.gravatarUrl} />
                {/* <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-2" /> */}
                <div>
                    <p className="font-bold">{post.author}</p>
                    <p className="text-gray-600 text-sm">{new Date(post.created_at).toLocaleString()}</p>
                </div>
            </div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
};

export default Post;
