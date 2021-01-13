import { useState } from 'react';
import firebaseConfig from '../../config/firebase-config';
import { useRouter } from 'next/router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotification] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();    
        firebaseConfig.auth()
          .signInWithEmailAndPassword(username, password)
          .catch((err) => {
            console.log(err.code, err.message)
            setNotification(err.message)        
            setTimeout(() => {
              setNotification('')
            }, 2000)
          })    
        setUsername('')
        setPassword('')
        router.push("/")  
    }
    
    return (
        <div>
            <h2>Login</h2>
            {notify}
            <form 
                onSubmit={handleLogin}>
                    Email<input 
                        type="text" 
                        value={username} 
                        onChange= {({target}) => setUsername(target.value)} />
                    <br />
                    Password<input 
                        type="password" 
                        value={password} 
                        onChange={({target}) => setPassword(target.value)} />
                    <br />
                    <button 
                    type="submit">Login</button>
            </form>
        </div>
    )
};

export default Login; 