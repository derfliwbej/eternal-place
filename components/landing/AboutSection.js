import styles from '@/app/styles/landing/AboutSection.module.css';

import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className={styles['about-section']}>
      <Image src="/eternal-logo.png" height={100} width={100} />
      <h1>Eternal Place Memorial Park</h1>
      <p>Copyright &copy; 2023. All rights reserved to Eternal Place Memorial Park.</p>
      <p>Sariaya, Quezon</p>
    </section> 
  );
};

export default AboutSection;