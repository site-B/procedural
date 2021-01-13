import React, { useState } from 'react';
import fire from '../config/firebase-config'; 
import 'firebase/firestore'; 

// const [hook, setHook] = useState(); 
const CreatePost = () => {
    const [title, setTitle] = useState(''); 
    const [subtitle, setSubtitle] = useState('');
    const [author, setAuthor] = useState(''); 
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState(''); 
    const [notification, setNotification] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fire.firestore().collection('blog').add({
            title: title,
            subtitle: subtitle,
            author: author,
            date: new Date(),
            content: content,
            categories: categories
        }); 



        setTitle('');
        setSubtitle('');
        setAuthor('');
        setContent('');
        setCategories('');

        setNotification('Post created');    
        setTimeout(() => {
            setNotification('')
          }, 2000)
    }

    return (
        <div className='create-post-container'>
            <div className='create-post-main'>
                <h2>
                    Create Post
                </h2>
            </div>
            {notification}
            <form onSubmit={handleSubmit}>
                <div>
                    Title<br></br>
                    <input
                        className='create-post-title' 
                        type='text' 
                        value={title} 
                        onChange={({target}) => setTitle(target.value)} />
                </div>
                <div>
                    Author<br></br>
                    <input
                        className='create-post-author' 
                        type='text' 
                        value={author} 
                        onChange={({target}) => setAuthor(target.value)} />
                </div>
                <div>
                    Subtitle<br></br>
                    <input 
                        className='create-post-subtitle'
                        type='text' 
                        value={subtitle} 
                        onChange={({target}) => setSubtitle(target.value)} />
                </div>
                <div>
                    Content<br />
                    <textarea 
                        className='create-post-textarea'
                        value={content}
                        onChange={({target}) => setContent(target.value)} />
                </div>
                <div>
                    Categories<br />
                    <input 
                        className='create-post-categories'
                        type='text'
                        value={categories}
                        onChange={({target}) => setCategories(target.value)} />
                </div>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default CreatePost; 