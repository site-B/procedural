// pages/index.js

import { useState, useEffect } from 'react'; 
import Link from 'next/link'; 
import Head from 'next/head';
import firebaseConfig from '../config/firebase-config'; 
import CreatePost from '../components/CreatePost'; 
import Register from './users/register'; 

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    firebaseConfig.firestore().collection('blog').onSnapshot(snap => {
      const blogs = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogs); 
    });
  }, []);

  console.log(blogs)
    return (
      <div>
      <Head>
        <title>procedural</title>
      </Head>
      <h1>procedural</h1>
        <ul>
          {blogs.map(blog => 
          <li key={blog.id}>
            <Link href='/blog/[id]' as={'/blog/' + blog.id}>
              <a>
                {blog.title}
                <br />
                {blog.subtitle}
              </a>
            </Link>
          </li>
          )}
        </ul>
      <CreatePost/>
    </div>
    )
}


/* const [blogs, setBlogs] = useState([]);

const Home = () => {
  return (
    <div>
      <Head>
        <title>procedural</title>
      </Head>
      <h1>procedural</h1>
      <CreatePost/>
    </div>
  )
} */

export default Home; 