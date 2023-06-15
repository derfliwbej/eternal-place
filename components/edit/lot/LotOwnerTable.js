import * as React from 'react';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ErrorDialog from '@/components/prompt/ErrorDialog';

import fetchUtil from '@/utils/fetchUtil';

import {
    DataGridPro,
    GridActionsCellItem,
} from '@mui/x-data-grid-pro';

const LotOwnerTable = ({ rows, setRows, rowModesModel, setRowModesModel, slots, slotProps, lotID, tombs, setOwners }) => {
    const [loading, setLoading] = React.useState(false);
    const [errorDialog, setErrorDialog] = React.useState({ title: '', message: '' });
    const [open, setOpen] = React.useState(false);

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleDeleteClick = (id) => async () => {
        if(tombs.length >= 1 && rows.length === 1) {
            setErrorDialog({ title: 'Cannot Delete User', message: 'Cannot delete the only owner as there is still an existing tomb.'});
            setOpen(true);
            return;
        }
        
        try {
            setLoading(true);
            const res = await fetchUtil(`/lot/owner?userID=${id}&lotID=${lotID}`, { method: 'DELETE' });
            
            setRows(rows.filter((row) => row.id !== id));
            setOwners((owners) => owners.filter((owner) => owner.id !== id));
        } catch(error) {
            setErrorDialog({ title: 'Error', message: error.message })
            setOpen(true);
        } finally {
            setLoading(false);
        }
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
        <>
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
            loading={loading}
            />
            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={open} setOpen={setOpen} />
        </>
    );
};

export default LotOwnerTable;