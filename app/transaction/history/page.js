'use client';
import DashboardLayout from "@/app/components/layouts/DashboardLayout";

import { Table, TableBody, TableCell,
         TableHead, TableRow } from '@mui/material';

const createData = (transactionID, lotIDs, dateCreated, amount, referenceNumber, status) => {
    return { transactionID, lotIDs, dateCreated, amount, referenceNumber, status };
};

const rows = [
    createData(1, [1, 2], '2023-4-28', 600, 6750989, 'Paid')
];

const combineLotIDs = (lotIDs) => {
    return lotIDs.reduce( (acc, current, i) => {
        if(i == 0) return current
        else return acc + `, ${current}`
    }, '');
};

const TransactionHistoryPage = () => {
    return (
        <DashboardLayout userType="user">
            <h3>Transaction History</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Lot IDs</TableCell>
                        <TableCell>Date Created</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Reference Number</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map( (row) => (
                        <TableRow key={row.transactionID}>
                            <TableCell>{row.transactionID}</TableCell>
                            <TableCell>{combineLotIDs(row.lotIDs)}</TableCell>
                            <TableCell>{row.dateCreated}</TableCell>
                            <TableCell>{row.amount}</TableCell>
                            <TableCell>{row.referenceNumber}</TableCell>
                            <TableCell>{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DashboardLayout>
    );
};

export default TransactionHistoryPage;