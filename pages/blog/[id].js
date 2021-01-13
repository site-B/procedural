/* import { useEffect, useState } from 'react';  */
import firebaseConfig from '../../config/firebase-config';
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
        <div>
            <h2>
            {props.title} by {props.author}
            </h2>
            <h3>
                {props.subtitle}
            </h3>
            <p>
                {props.content}
            </p>
            <Link href="/">
                <a>back</a>
            </Link>
        </div>
    )
};

export const getServerSideProps = async ({ query }) => {
    const content = {};
    await firebaseConfig.firestore()
    .collection('blog')
    .doc(query.id)
    .get()
    .then(result => {
        content['title'] = result.data().title;
        content['author'] = result.data().author;
        content['subtitle'] = result.data().subtitle;
        content['content'] = result.data().content;
    });

    return {
        props: {
            title: content.title,
            author: content.author,
            subtitle: content.subtitle,
            content: content.content
        }
    }
}

export default Blog; 