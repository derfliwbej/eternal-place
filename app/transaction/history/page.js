'use client';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useState, useEffect } from 'react';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { CircularProgress } from "@mui/material";
import fetchUtil from "@/utils/fetchUtil";
import ErrorDialog from "@/components/prompt/ErrorDialog";
import dayjs from "dayjs";

const LoadingPage = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <CircularProgress />
        </div>
    );
};

const TransactionHistoryPage = () => {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorDialog, setErrorDialog] = useState({ title: '', message: '' });
    const [showError, setShowError] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'lot_id', headerName: 'Lot ID', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'reference_num', headerName: 'Reference Number', type: 'text', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'date_created', headerName: 'Date Created', type: 'date', align: 'center', headerAlign: 'center', flex: 0.3,
          valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD') 
        },
        { field: 'amount', headerName: 'Amount', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'status', headerName: 'Status', type: 'text', align: 'center', headerAlign: 'center', flex: 0.3 },
    ];

    useEffect( () => {
        const makeRequest = async () => {
            try {
                setLoading(true);

                const res = await fetchUtil('/user/transactionHistory');
                const transactions = await res.json();

                setRows(transactions);
            } catch (error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        makeRequest();
    }, []);

    return (
        <DashboardLayout userType="user">
            {loading ? <LoadingPage /> : (
                <>
                    <h2 style={{ marginBottom: 5 }}>Transaction History</h2>
                    <DataGrid rows={rows}
                            columns={columns}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    printOptions: { disableToolbarButton: true },
                                    csvOptions: { disableToolbarButton: true }
                                }
                            }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10, 15, 20, 25, 30]}
                    />
                </>
            )}
            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={showError} setOpen={setShowError} />
        </DashboardLayout>
    );
};

export default TransactionHistoryPage;