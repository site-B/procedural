import React, { useState } from 'react';
import firebaseConfig from '../config/firebase-config'; 

// const [hook, setHook] = useState(); 
const CreatePost = () => {
    const [title, setTitle] = useState(''); 
    const [subtitle, setSubtitle] = useState('');
    const [author, setAuthor] = useState(''); 
    const [content, setContent] = useState('');
    const [notification, setNotification] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        firebaseConfig.firestore().collection('blog').add({
            title: title,
            subtitle: subtitle,
            author: author,
            content: content
        }); 

        console.log({
            'title': title,
            'subtitle': subtitle,
            'author': author,
            'content': content
        });

        setTitle('');
        setSubtitle('');
        setAuthor('');
        setContent('');

        setNotification('Post created');    
        setTimeout(() => {
            setNotification('')
          }, 2000)
    }

    return (
        <div>
            <h2>
                Add Blog
            </h2>
            {notification}
            <form onSubmit={handleSubmit}>
                <div>
                    Title<br></br>
                    <input 
                        type='text' 
                        value={title} 
                        onChange={({target}) => setTitle(target.value)} />
                </div>
                <div>
                    Author<br></br>
                    <input 
                        type='text' 
                        value={author} 
                        onChange={({target}) => setAuthor(target.value)} />
                </div>
                <div>
                    Subtitle<br></br>
                    <input 
                        type='text' 
                        value={subtitle} 
                        onChange={({target}) => setSubtitle(target.value)} />
                </div>
                <div>
                    Content<br />
                    <textarea 
                        value={content}
                        onChange={({target}) => setContent(target.value)} />
                </div>
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default CreatePost; 