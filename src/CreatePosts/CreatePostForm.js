import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Avatar from './Avatar';
import EmojiPicker from './EmojiPicker'; // Assume this component can insert emojis into text
import UploadButton from './UploadButton'; // Assume this component handles image uploads and returns a URL
import defaultPic from '../defaultpic.png';

const CreatePostForm = forwardRef(({ onFormSubmit }, ref) => {
    const [postText, setPostText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleImageUpload = (url) => {
        setImageUrl(url || '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit({ text: postText, imageUrl });
    };

    // Expose the handleSubmit method to parent components via ref
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(new Event('submit'));
        }
    }));

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column">
            <div className="d-flex align-items-center">
                <div className="p-2">
                    <Avatar src={defaultPic} alt="from fb" />
                </div>
                <p className="m-0 fw-bold">Tomer</p>
            </div>
            <textarea
                cols="30"
                rows="5"
                className="form-control border mt-2"
                placeholder="How Are You Feeling?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
            ></textarea>

            {/* Assuming EmojiPicker and UploadButton are controlled components */}
            <EmojiPicker />
            <UploadButton onImageUpload={handleImageUpload} />
        </form>
    );
});
export default CreatePostForm;
