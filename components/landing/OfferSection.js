"use client";
import styles from '@/app/styles/landing/OfferSection.module.css';

import Carousel from 'react-bootstrap/Carousel';

const OfferSection = () => {
    return (
        <section className={styles['offer-section']}>
            <div className={`center ${styles['header-container']}`}>
                <h1>What We Offer</h1>
            </div>
            <p className="center">We understand the importance of preserving the legacies that shape our lives. Our meticulously landscaped park serves as a timeless canvas for personalized memorials, where families can find solace in the beauty of nature while paying tribute to their loved ones. With a variety of lot sizes and locations available, we offer a customizable experience to suit your individual preferences and needs.</p>
            <div className={styles['carousel-container']}>
                <Carousel interval={3000} style={{ minWidth: '500px' }}>
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