'use client';
import styles from '@/app/styles/landing/AboutSection.module.css';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className={styles['about-section']}>
      <Image src="/eternal-logo.png" height={100} width={100} />
      <h1>Eternal Place Memorial Park</h1>
      <p>Where Timeless Memories Rest</p>
      <h2>Contact Us</h2>
      <p>Mobile Phone: +63 906 008 3405</p>
      <div className={styles['icons-container']}>
        <FacebookIcon sx={{ color: 'white', '&:hover': { color: '#ECBC3E', cursor: 'pointer' }, fontSize: '2rem' }} />
        <InstagramIcon sx={{ color: 'white', '&:hover': { color: '#ECBC3E', cursor: 'pointer' }, fontSize: '2rem' }} />
      </div>
      <p>Copyright &copy; 2023. All rights reserved to Eternal Place Memorial Park.</p>
      <p>Eternal Place Memorial Park, Brgy. Sampaloc 2, Sariaya, Quezon</p>
    </section> 
  );
};

export default AboutSection;