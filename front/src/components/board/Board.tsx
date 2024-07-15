import React, { useEffect, useState } from 'react';
import Post from './Post';
import PostForm from './PostForm';
import TopBar from './TopBar';
import axiosInstance from '../../utils/api/axiosInstance';
import { decodeToken } from '../../utils/decodeToken';

interface PostData {
    id: number;
    content: string;
    author: string;
    gravatarUrl: string;
    created_at: string;
}

const Board: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [username, setUsername] = useState<string>('');
    const [gravatarUrl, setGravatarUrl] = useState<string>('');

    useEffect(() => {
        axiosInstance.get('/api/post/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("Une erreur s'est produite dans la récupération des posts", error);
            });

        const token = localStorage.getItem('jwt_token');
        if (token) {
            const decoded = decodeToken(token);
            setUsername(decoded.name);
            setGravatarUrl(decoded.gravatarUrl);
        }
    }, []);

    const handlePostCreated = (newPost: PostData) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div>
            <TopBar username={username} gravatarUrl={gravatarUrl} />
            <div className="p-4">
                <PostForm onPostCreated={handlePostCreated} />
                <div className="mt-8">
                    {posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Board;
