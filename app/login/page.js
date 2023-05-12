import LoginForm from './form';

import styles from '../styles/login/LoginPage.module.css';

const LoginPage = () => {
    return (
        <div className={styles['wrapper']}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;