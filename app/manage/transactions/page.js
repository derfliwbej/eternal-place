'use client';
import { useState } from 'react';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';

import TransactionsTable from '@/app/components/manage/transactions/TransactionsTable';

const initialRows = [
    { id: 1, createdBy: 'Jeb', dateCreated: '01/01/2001', amount: 1000, referenceNumber: '123456789', status: 'For Payment' },
    { id: 2, createdBy: 'Ella', dateCreated: '02/02/2002', amount: 600, referenceNumber: '987654321', status: 'Paid' }
];

const ManageTransactionsPage = () => {
    const [rows, setRows] = useState(initialRows);

    return (
        <DashboardLayout userType="admin">
            <TransactionsTable rows={rows} setRows={setRows} />
        </DashboardLayout>
    );
};

export default ManageTransactionsPage;