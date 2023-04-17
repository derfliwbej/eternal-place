import styles from '@/app/styles/landing/AboutSection.module.css';

import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className={styles['about-section']}>
      <Image src="/eternal-logo.png" height={100} width={100} />
      <h1>Eternal Place Memorial Park</h1>
      <p id="about">Do incididunt eiusmod ex id et non voluptate in incididunt eiusmod do officia labore. Cillum ad nulla ea non pariatur. Laborum quis do dolor quis nostrud reprehenderit laboris ut.</p>
    </section> 
  );
};

export default AboutSection;