'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import fetchUtil from '@/utils/fetchUtil';

import LotTable from "../../components/search/LotTable";
import { CircularProgress } from '@mui/material';
import ErrorDialog from '@/components/prompt/ErrorDialog';

const LotSearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [errorDialog, setErrorDialog] = useState({});
    const [showError, setShowError] = useState(false);

    useEffect( () => {
        const fetchLots = async () => {
            try {
                setLoading(true);

                const res = await fetchUtil('/lots_table');
                const lots = await res.json();

                setRows(lots);
            } catch(error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchLots();
    }, []);

    return (
        <DashboardLayout userType="admin">
            {loading ? (<div style={{ display: 'flex', height: '80vh', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>) : (
                <>
                    <h2 style={{ marginBottom: 20 }}>Viewing All Owned and Non-vacant Lots</h2>
                    <LotTable rows={rows} loading={loading} />
                </>
            )}
            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={showError} setOpen={setShowError} />
        </DashboardLayout>
    );
};

export default LotSearchPage;