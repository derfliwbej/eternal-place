'use client';
import styles from '../styles/login/LoginPage.module.css';

import Image from 'next/image';
import { Paper, TextField, CircularProgress } from '@mui/material';
import ErrorText from '@/components/prompt/ErrorText';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/supabase-auth-provider';

const LoginButton = ({ disabled, onClick }) => {

    if (disabled) {
        return (
            <div className={styles['login-button--disabled']} onClick={() => {}}>
                <span>Login</span>
            </div>
    )} else {
        return (
            <div className={styles['login-button']} onClick={onClick}>
                <span>Login</span>
            </div>
    )};
};

const LoginForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithEmail, user } = useAuth();

    const handleSubmit = async (e) => {
        setError('');
        setIsLoading(true);
        try {
            const error = await signInWithEmail(email, password);
            if (error) {
                setError(error);
                console.log(error);

                setIsLoading(false);
            }
        } catch (error) {
            console.log("Something went wrong!");
            setError('Server error. Please try logging in again.');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            if(user.admin_role) router.push('/dashboard/admin');
            else router.push('/dashboard/user');
        }
    }, [user])

    return (
        <div className={styles['form-container']}>
            <Paper elevation={1} sx={{ padding: 2, minWidth: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2.5 }}>
                <Image src='/eternal-logo.png' width={75} height={75} />
                {isLoading ? <CircularProgress /> : ''}
                <h2>Sign In</h2>
                <ErrorText>{error}</ErrorText>
                <TextField value={email} label="Email" onChange={(event) => setEmail(event.target.value)} fullWidth />
                <TextField value={password} label="Password" onChange={(event) => setPassword(event.target.value)} fullWidth type="password" />
                <LoginButton disabled={isLoading} onClick={handleSubmit}/>
            </Paper>
        </div>
    );
};

export default LoginForm;