// pages/index.js

import { useState, useEffect } from 'react'; 
import Link from 'next/link'; 
import Head from 'next/head';
import fire from '../config/firebase-config'; 
import CreatePost from '../components/CreatePost'; 


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState('');

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })

  useEffect(() => {
    fire
    .firestore()
    .collection('blog')
    .onSnapshot(snap => {
      const blogs = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogs); 
    });
  }, [])
  console.log(blogs);

  const handleLogout = () => {
    fire.auth().signOut().then(() => {
      setNotification('logged out')
      setTimeout(() => {
        setNotification('')
      }, 2000)
    }); 
  }

    return (
      <div className='index-container'>
        <Head>
          <title>procedural</title>
        </Head>
        <div className='index-procedural'>
          <h1>procedural</h1>
        </div>
        {notification}

        {
          !loggedIn ? 
            <div className='index-register-n-login'>
              <Link href="/users/register">
                <a>register here</a>
              </Link>
              <br /> 
              <Link href="/users/login">
                <a>Login</a>
              </Link>
            </div>
            :
              <button onClick={handleLogout}>Logout</button>
        }

          <div>
            {blogs.map(blog => 
            <p className='post-preview'
            key={blog.id}>
              <Link href='/blog/[id]' as={'/blog/' + blog.id}>
                <a>
                  {blog.title}
                  <br />
                  {blog.subtitle}
                </a>
              </Link>
            </p>
            )}
          </div>
        {
          loggedIn && <CreatePost/>
        }
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