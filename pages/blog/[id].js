/* import { useEffect, useState } from 'react';  */
import fire from '../../config/firebase-config';
import Link from 'next/link';

const Blog = (props) => {
/*     const [blog, setBlog] = useState(null);

    useEffect(() => {
        firebaseConfig.firestore().collection('blog').doc(props.id).get().then(result => {
            setBlog(result.data())
        })
    }, []);

    if(!blog){
        return(
            <h2>Loading...</h2>
        )
    } */

    return (
        <div className='post-container'>
            <h2 className="post-title-n-author">
            {props.title} by {props.author}
            </h2>
{/*             <h3>{new Date(props.date.seconds * 1000)}</h3> */}
            <h3 className="post-subtitle">
                {props.subtitle}
            </h3>
            <p  className="post-content">
                {props.content}
            </p>
            <p>
                {props.categories}
            </p>
            <Link  className="back-button"
            href="/">
                <a>back</a>
            </Link>
        </div>
    )
};

export const getServerSideProps = async ({ query }) => {
    const content = {};
    await fire.firestore()
    .collection('blog')
    .doc(query.id)
    .get()
    .then(result => {
        content['title'] = result.data().title;
        content['author'] = result.data().author;
        content['subtitle'] = result.data().subtitle;
/*         content['date'] = result.data().date;  */
        content['content'] = result.data().content;
        content['categories'] = result.data().categories;
    });

    return {
        props: {
            title: content.title,
            author: content.author,
            subtitle: content.subtitle,
/*             date: content.date,  */
            content: content.content,
            categories: content.categories
        }
    }
}



export default Blog; 