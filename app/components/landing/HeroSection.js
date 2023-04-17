'use client';
import styles from '@/app/styles/landing/HeroSection.module.css';
import Link from 'next/link';

const HeroSection = () => {
    console.log(styles);

    return (
        <section className={styles.hero} id="offers">
            <div className={styles["hero__messageContainer"]}>
                <h1>LOREM IPSUM DOLOR</h1>
                <p>In officia do velit exercitation eu commodo eiusmod irure et nisi est deserunt labore. Eiusmod aute minim minim do exercitation proident Lorem Lorem sunt minim do proident labore. Non incididunt officia tempor ad dolor. Labore quis quis tempor eiusmod laborum.</p>
                <Link href='/#about' className={styles["view-button"]} >View Our Contact Details</Link>
            </div>
        </section>
    );
};

export default HeroSection;