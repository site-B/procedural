// pages/index.js

import { useState, useEffect } from 'react'; 
import Link from 'next/link'; 
import Head from 'next/head';
import firebaseConfig from '../config/firebase-config'; 
import CreatePost from '../components/CreatePost'; 


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState('');

  firebaseConfig.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })

  useEffect(() => {
    firebaseConfig
    .firestore()
    .collection('blog')
    .onSnapshot(snap => {
      const blogs = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogs); 
    });
  }, []);

  const handleLogout = () => {
    firebaseConfig.auth().signOut().then(() => {
      setNotification('logged out')
      setTimeout(() => {
        setNotification('')
      }, 2000)
    }); 
  }

    return (
      <div>
      <Head>
        <title>procedural</title>
      </Head>
      <h1>procedural</h1>
      {notification}

      {
        !loggedIn ? 
          <div>
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