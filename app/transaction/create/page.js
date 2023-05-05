'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';

import { Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Lot ID', flex: 1 },
    { field: 'block', headerName: 'Block Number', flex: 1 },
    { field: 'section', headerName: 'Section', flex: 1 },
    { field: 'lot', headerName: 'Lot Number', flex: 1 },
    { field: 'deceased', headerName: 'Deceased Name(s)', flex: 7 }
];

const rows = [
    { id: 1, block: 1, section: 'A', lot: 1, deceased: "Rafael Remo, Ynigo Zarsuela" }
];

const Toolbar = ({ amount }) => {
    return (
        <Typography sx={{ padding: 2 }}variant="h6" component="div">Amount to pay: {amount}</Typography>
    );
};

const MakeTransactionPage = () => {
    const amount = 0;

    return (
        <DashboardLayout userType="user">
            <h3 style={{ marginBottom: 10 }}>Select all lots for lighting</h3>
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
                      pageSizeoptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
            />
            <Button sx={{ marginTop: 3 }} variant="contained">Submit</Button>
        </DashboardLayout>
    );
};

export default MakeTransactionPage;