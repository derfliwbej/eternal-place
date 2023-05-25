'use client';
import styles from '@/app/styles/landing/HeroSection.module.css';
import { Card, CardContent } from '@mui/material';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className={styles.hero} id="offers">
            <div className={styles["hero__messageContainer"]}>
                <h1>Create Lasting Tributes</h1>
                <p>Our Memorial Park offers a range of thoughtfully designed lots for memorial purposes, providing a tranquil setting for reflection, remembrance, and celebration of cherished memories.</p>
                <div style={{ display: 'flex', justifyContent: 'left' }}>
                    <Link href="/login" className={styles['view-button']}>Sign In With Your Account</Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;