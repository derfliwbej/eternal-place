'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import fetchUtil from '@/utils/fetchUtil';
import { useRouter } from 'next/navigation';

import { Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ErrorDialog from '@/components/prompt/ErrorDialog';

const columns = [
    { field: 'id', headerName: 'ID', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'block', headerName: 'Block', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'section', headerName: 'Section', type: 'string', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'lot_num', headerName: 'Lot', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'is_mausoleum', headerName: 'Is Mausoleum', type: 'boolean', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'tomb_count', headerName: 'Number of Tombs', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 }
];

const Toolbar = ({ amount }) => {
    return (
        <Typography sx={{ padding: 2 }}variant="h6" component="div">{`Amount to pay: PHP${amount}.00`}</Typography>
    );
};

const MakeTransactionPage = () => {
    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [selectedRowID, setSelectedRowID] = useState(0);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [errorDialog, setErrorDialog] = useState({ title: '', message: '' });
    const [showError, setShowError] = useState(false);
    const [selectionModel, setSelectionModel] = useState([]);

    const onRowSelectionModelChange = selection => {
        const amountPerTomb = 500;
        if (selection.length >= 1) {
            const selectionSet = new Set(selectionModel);
            const result = selection.filter( s => !selectionSet.has(s));
            
            const rowID = result[0];
            const selectedRow = rows.find( currentRow => currentRow.id == rowID);

            setAmount(amountPerTomb * selectedRow?.tomb_count);
            setSelectedRowID(selectedRow.id);

            setSelectionModel(result);
        } else {
            setAmount(0);
            setSelectionModel(selection);
        }
    };

    const onPaymentProceed = () => {
        setLoading(true);
        router.push(`/payment/${selectedRowID}`);
    };

    useEffect( () => {
        const makeRequest = async () => {
            try {
                setLoading(true);
                const res = await fetchUtil('/user/lotsForLighting');
                const lots = await res.json();

                setRows(lots);
            } catch(error) {
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
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <h3 style={{ marginBottom: 10 }}>Available lots for lighting</h3>
                    <DataGrid rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            slots={{
                                toolbar: Toolbar
                            }}
                            slotProps={{
                                toolbar: { amount }
                            }}
                            pageSizeoptions={[5, 10, 15, 20]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            hideFooterSelectedRowCount
                            rowSelectionModel={selectionModel}
                            onRowSelectionModelChange={onRowSelectionModelChange}
                            sx={{
                                '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
                                    display: 'none'
                                }
                            }}
                    />
                    <Button disabled={!selectionModel.length} sx={{ marginTop: 3 }} variant="contained" onClick={onPaymentProceed}>Proceed to Payment</Button>
                </>
            )}
            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={showError} setOpen={setShowError} />
        </DashboardLayout>
    );
};

export default MakeTransactionPage;