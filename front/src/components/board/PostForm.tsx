import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axiosInstance from '../../utils/api/axiosInstance';
import { useModal } from '../../contexts/ModalContext';

interface PostFormProps {
    onPostCreated: (post: any) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const { openModal } = useModal();

    const handleEditorChange = (content: string) => {
        setContent(content);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/api/post/posts', JSON.stringify({ content }));
            if (response.status === 201) {
                onPostCreated(response.data); // Call the callback function to update the state
                setContent(''); // Clear the editor content
            }
        } catch (error) {
            openModal('Post not created' ,'There was an error creating the post!'); // Show error modal
            console.error('There was an error creating the post!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
            <Editor
                tinymceScriptSrc='/tinymce/tinymce.min.js'
                licenseKey='gpl'
                value={content}
                onEditorChange={handleEditorChange}
                init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                        'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
            />
            <button type="submit" className="btn btn-primary mt-4">Post</button>
        </form>
    );
};

export default PostForm;
