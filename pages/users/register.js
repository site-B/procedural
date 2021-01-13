import { useState } from 'react'; 
import firebaseConfig from '../../config/firebase-config';
import { useRouter } from 'next/router';

const Register = () => {

    const router = useRouter();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passConf, setPassConf] = useState('');

    const [notification, setNotification] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (password !== passConf) {
            setNotification(
                'Password and password confirmation do not match, fucko'
            )

            setTimeout(() => {
                setNotification('')
            }, 2000)

            setPassword('');
            setPassConf('');
            return null; 
        }

        firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(userName, password)
        .catch(() => {
            console.log(err.code, err.message)
        }); 

        router.push("/")
    }

    return (
        <div>
            <h2>Create new user</h2>

            {notification}

            <form onSubmit={handleLogin}>
                Email: <input type="text" value={userName} onChange={({target}) => setUsername(target.value)} />
                <br />
                Password: <input 
                type='password' 
                value={password} 
                onChange={({target}) => setPassword(target.value)} />
                <br />
                Password confirmation: <input 
                type='password' 
                value={passConf} 
                onChange={({target}) => setPassConf(target.value)} />
                <br />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Register; 