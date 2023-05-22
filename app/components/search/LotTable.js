'use client';
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { useRouter } from 'next/navigation';

const LotTable = ({ rows, loading }) => {
    const router = useRouter();

    const handleRedirect = (id) => {
        router.push(`/edit/lot/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'block', headerName: 'Block', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'section', headerName: 'Section', type: 'string', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'lot_num', headerName: 'Lot', type: 'number', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'is_mausoleum', headerName: 'Is Mausoleum', type: 'boolean', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'has_light', headerName: 'Has Light', type: 'boolean', align: 'center', headerAlign: 'center', flex: 0.3 },
        { field: 'lot_deceased', headerName: 'Deceased Name(s)', type: 'string', align: 'center', headerAlign: 'center', flex: 1 },
        { field: 'lot_owners', headerName: 'Owners', type: 'string', align: 'center', headerAlign: 'center', flex: 1 },
        { 
            field: 'view', 
            headerName: 'Link', 
            flex: 0.3,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Button onClick={ (event) => handleRedirect(params.row.id) }>View Lot</Button>
            ) 
        },
    ];

    return(
        <div>
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
                      loading={loading}
                      sx={{
                        "& .MuiDataGrid-cell": {
                            whiteSpace: "normal !important",
                            wordWrap: "break-word !important"
                        }
                      }}
            />
        </div>
    );
};

export default LotTable;