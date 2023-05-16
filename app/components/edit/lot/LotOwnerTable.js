import * as React from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import {
    DataGridPro,
    GridActionsCellItem,
} from '@mui/x-data-grid-pro';

const LotOwnerTable = ({ rows, setRows, rowModesModel, setRowModesModel, slots, slotProps }) => {

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'first_name', headerName: 'First Name', flex: 1, editable: false },
        { field: 'middle_name', headerName: 'Middle Name', flex: 1, editable: false },
        { field: 'last_name', headerName: 'Last Name', flex: 1, editable: false },
        { field: 'email', headerName: 'Email', flex: 1, editable: false },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return([
                    <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
                    color="inherit"
                    />
                ]);
            },
        },
    ];

    return (
        <DataGridPro
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={slots}
            slotProps={slotProps}
            pagination={true}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5, 10, 15, 20]}
        />
    );
};

export default LotOwnerTable;