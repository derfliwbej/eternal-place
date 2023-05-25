'use client';
import { useState } from 'react';
import dayjs from 'dayjs';
import fetchUtil from '@/utils/fetchUtil';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import StatusSelect from './StatusSelect';


const TransactionsTable = ({ rows, setRows, setErrorDialog, setShowError }) => {

    const [loading, setLoading] = useState(false);

    const handleStatusChange = (id) => (event) => {
        const newStatus = event.target.value;

        const makeRequest = async () => {
            try {
                setLoading(true);

                const res = await fetchUtil(`/transaction?id=${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                const updatedRows = rows.map( (row) => {
                    if (row.id === id) return { ...row, status: newStatus }
                    else return row;
                });
        
                setRows(updatedRows);
            } catch(error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        makeRequest();
    };

    const columns = [
        { field: 'id', headerName: 'Transaction ID', type: 'number', align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'full_name', headerName: 'Created By', type: 'text', align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'email', headerName: 'Email', type: 'text', align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'lot', headerName: 'Lot', type: 'number', align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'date_created', headerName: 'Date Created', type: 'date', align: 'center', headerAlign: 'center', flex: 1,
          valueFormatter: (params) => dayjs(params.value).format('YYYY-MM-DD') },
        { field: 'amount', headerName: 'Amount', type: 'number', align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'reference_num', headerName: 'Reference Number', type: 'number', align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'status', headerName: 'Status', type: 'text', align: 'center', headerAlign: 'center', flex: 1,
          renderCell: params => (
            <StatusSelect id={params.row.id} status={params.row.status} onChange={handleStatusChange(params.row.id)} />
          )},
    ];

    return (
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
                  loading={loading}
                  pageSizeOptions={[10, 15, 20, 25, 30]}
                  sx={{
                  "& .MuiDataGrid-cell": {
                      whiteSpace: "normal !important",
                      wordWrap: "break-word !important"
                  }
                  }}
        />
    );
};

export default TransactionsTable;