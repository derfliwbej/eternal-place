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
        { field: 'id', headerName: 'ID', type: 'number', flex: 0.3, editable: false },
        { field: 'firstName', headerName: 'First Name', flex: 1, editable: false },
        { field: 'middleName', headerName: 'Middle Name', flex: 1, editable: false },
        { field: 'lastName', headerName: 'Last Name', flex: 1, editable: false },
        { field: 'username', headerName: 'Username', flex: 1, editable: false },
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
        />
    );
};

export default LotOwnerTable;