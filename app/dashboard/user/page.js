'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';

import LotCard from '@/app/components/dashboard/user/LotCard';

import styles from '@/app/styles/dashboard/user/UserDashboard.module.css';

const UserDashboard = () => {
    return (
        <>
            <DashboardLayout userType="user">
                <h2 className={styles['header']}>Owned Lots</h2>
                <div className={styles['cards-container']}>
                    <LotCard name="Remo, Rafael" block="1" section="A" lot="3"/>
                    <LotCard name="Zarsuela, Ynigo" block="2" section="B" lot="5"/>
                </div>
            </DashboardLayout>
        </>
    );
};

export default UserDashboard;