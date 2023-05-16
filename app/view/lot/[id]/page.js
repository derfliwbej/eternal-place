'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';
import Image from 'next/image';

import LotTomb from '@/app/components/edit/lot/LotTomb';
import LotOwners from '@/app/components/edit/lot/LotOwners';

const ViewLotPage = ({ params }) => {
    const { id } = params;

    return (
        <DashboardLayout userType="admin">
            <h2>Lot {id}</h2>
            <div className={styles['details-container']}>
                <div className={styles['image-container']}>
                    <Image src="/mausoleum.jpg" fill style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles['identifier-container']}>
                    <ul>
                        <li>Block: 1</li>
                        <li>Section: A</li>
                        <li>Lot Number: 1</li>
                    </ul>
                </div>
            </div>

            <LotOwners />

            <h2 className={styles['header-message']}>Lot Tombs</h2>
            <LotTomb id={1} />
        </DashboardLayout>
    );
};

export default ViewLotPage;