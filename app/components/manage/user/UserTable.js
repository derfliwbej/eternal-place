import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ErrorDialog from '@/app/components/error/ErrorDialog';

import fetchUtil from '@/utils/fetchUtil';

import {
    GridRowModes,
    DataGridPro,
    GridActionsCellItem,
} from '@mui/x-data-grid-pro';

const UserTable = ({ rows, setRows, rowModesModel, setRowModesModel, slots, slotProps, setLoading, loading }) => {
    const [errorDialog, setErrorDialog] = React.useState({ title: '', message: '' });
    const [open, setOpen] = React.useState(false);

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        try {
            setLoading(true);
            const res = await fetchUtil(`/user?id=${id}`, { method: 'DELETE' });
            
            setRows(rows.filter((row) => row.id !== id));
        } catch(error) {
            setErrorDialog({ title: 'Error', message: error.message })
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
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
        { field: 'email', headerName: 'Email', flex: 1, editable: false, },
        { field: 'first_name', headerName: 'First Name', flex: 1, editable: true },
        { field: 'middle_name', headerName: 'Middle Name', flex: 1, editable: true },
        { field: 'last_name', headerName: 'Last Name', flex: 1, editable: true },
        { field: 'contact_num', headerName: 'Contact Number', flex: 1, editable: true },
        { field: 'address', headerName: 'Address', flex: 1, editable: true },
        { field: 'admin_role', headerName: 'Is Admin', type: 'boolean', flex: 1, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1,
            cellClassName: 'actions',
            getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                />,
                ];
            }

            return [
                <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
                />,
                <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
                />,
            ];
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
            loading={loading}
            />
            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={open} setOpen={setOpen} />
        </>
    );
};

export default UserTable;