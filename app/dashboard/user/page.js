'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';
import fetchUtil from '@/utils/fetchUtil';

import LotCard from '@/app/components/dashboard/user/LotCard';
import { CircularProgress } from '@mui/material';
import ErrorDialog from '@/app/components/prompt/ErrorDialog';

import styles from '@/app/styles/dashboard/user/UserDashboard.module.css';

const UserDashboard = () => {
    const [lots, setLots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState({ title: '', message: '' });
    const [showError, setShowError] = useState(false);

    useEffect( () => {
        const makeRequest = async () => {
            try {
                setLoading(true);

                const res = await fetchUtil('/owned_lots');
                const lots = await res.json();

                console.log(lots);

                setLots(lots);
            } catch(error) {
                setErrorDialog({ title: 'Internal Server Error', message: 'Error retrieving lots. Please refresh the page and try again.' });
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        makeRequest();
    }, []);

    return (
        <>
            <DashboardLayout userType="user">
                {loading ? (
                    <div className={styles['loading-container']}>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <h2 className={styles['header']}>Owned Lots</h2>
                        <div className={styles['cards-container']}>
                            {lots.map( lot => {
                                return (
                                    <LotCard key={lot.id} id={lot.id} lot={lot} />
                                );
                            })}
                        </div>  
                    </>
                )}
                <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={showError} setOpen={setShowError} />
            </DashboardLayout>
        </>
    );
};

export default UserDashboard;