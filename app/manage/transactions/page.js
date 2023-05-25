'use client';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import DashboardLayout from '@/components/layouts/DashboardLayout';

import TransactionsTable from '@/components/manage/transactions/TransactionsTable';
import ErrorDialog from '@/components/prompt/ErrorDialog';
import fetchUtil from '@/utils/fetchUtil';

const initialRows = [
    { id: 1, full_name: 'Jeb Wilfred Deduyo Panganiban', email: 'panganibanjebwilfred@gmail.com', lot: 'Block 1, Section A, Lot 1', date_created: '2023-05-22', amount: 1000, reference_num: '1234567898765', status: 'Paid' },
    { id: 2, full_name: 'Jeb Wilfred Deduyo Panganiban', email: 'panganibanjebwilfred@gmail.com', lot: 'Block 1, Section A, Lot 1', date_created: '2023-05-22', amount: 1000, reference_num: '1234567898765', status: 'Paid' }
];

const LoadingPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
        </div>
    )
};

const ManageTransactionsPage = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState({ title: '', message: '' });
    const [showError, setShowError] = useState(false);

    useEffect( () => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);

                const res = await fetchUtil('/transaction');
                const transactions = await res.json();

                setRows(transactions);
            } catch(error) {
                setErrorDialog({ title: 'Error', message: error.message });
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <DashboardLayout userType="admin">
            {loading ? <LoadingPage /> : (
                <>
                    <h2 style={{ marginBottom: 10 }}>Manage All Transactions</h2>
                    <TransactionsTable rows={rows} setRows={setRows} setErrorDialog={setErrorDialog} setShowError={setShowError} />
                </>
            )}
            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={showError} setOpen={setShowError} />
        </DashboardLayout>
    );
};

export default ManageTransactionsPage;