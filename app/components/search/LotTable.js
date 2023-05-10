'use client';
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { useRouter } from 'next/navigation';

const initialRows = [
    { id: 1, block: 1, section: 'A', lot: 1, isMausoleum: true, deceasedNames: 'Panganiban, Jeb', owners: 'Sales, Ella' }
];

const LotTable = ({ rowsProps }) => {
    const router = useRouter();

    const [rows, setRows] = useState(rowsProps || initialRows);

    const handleRedirect = (id) => {
        router.push(`/edit/lot/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', flex: 0.3 },
        { field: 'block', headerName: 'Block', type: 'number', flex: 0.3 },
        { field: 'section', headerName: 'Section', type: 'string', flex: 0.3 },
        { field: 'lot', headerName: 'Lot', type: 'number', flex: 0.3 },
        { field: 'isMausoleum', headerName: 'Is Mausoleum', type: 'boolean', flex: 0.3 },
        { field: 'deceasedNames', headerName: 'Deceased Name(s)', type: 'string', flex: 1 },
        { field: 'owners', headerName: 'Owners', type: 'string', flex: 1 },
        { 
            field: 'view', 
            headerName: 'Link', 
            flex: 0.3,
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
                      
            />
        </div>
    );
};

export default LotTable;