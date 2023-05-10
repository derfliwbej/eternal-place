'use client';
import styles from '../styles/login/LoginPage.module.css';

import Image from 'next/image';
import { Paper, TextField } from '@mui/material';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginButton = ({ onClick }) => {
    return (
        <div className={styles['login-button']} onClick={onClick}>
            <span>Login</span>
        </div>
    );
};

const LoginPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        router.push('/dashboard/admin');
    };

    return (
        <div className={styles['wrapper']}>
            <div className={styles['form-container']}>
                <Paper elevation={1} sx={{ padding: 2, minWidth: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2.5 }}>
                    <Image src='/eternal-logo.png' width={75} height={75} />
                    <h2>Sign In</h2>
                    <TextField value={email} label="Email" onChange={(event) => setEmail(event.target.value)} fullWidth />
                    <TextField value={password} label="Password" onChange={(event) => setPassword(event.target.value)} fullWidth type="password" />
                    <LoginButton onClick={login}/>
                </Paper>
            </div>
        </div>
    );
};

export default LoginPage;