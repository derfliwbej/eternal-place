"use client";
import styles from '@/app/styles/landing/OfferSection.module.css';

import Carousel from 'react-bootstrap/Carousel';

const OfferSection = () => {
    return (
        <section className={styles['offer-section']}>
            <div className={`center ${styles['header-container']}`}>
                <h1>WHAT WE OFFER</h1>
            </div>
            <p className="center">Eu fugiat nostrud proident aliqua occaecat ut velit. Do laboris deserunt culpa fugiat voluptate deserunt cillum in id commodo duis nostrud voluptate. Non culpa nulla velit ipsum aliquip reprehenderit ut fugiat magna commodo incididunt sit. Fugiat aliquip veniam consequat proident cupidatat mollit sint exercitation nulla.</p>
            <div className={styles['carousel-container']}>
                <Carousel interval={3000}>
                    <Carousel.Item>
                        <img className='d-block w-100' src='/mausoleum.jpg' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' src='/vault.jpg' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className='d-block w-100' src='/pantheon.jpg' />
                    </Carousel.Item>
                </Carousel>
            </div>
        </section>
    );
};

export default OfferSection;