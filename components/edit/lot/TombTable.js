import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import fetchUtil from '@/utils/fetchUtil';

import dayjs from 'dayjs';

import {
    GridRowModes,
    DataGridPro,
    GridActionsCellItem,
    GridEditInputCell,
    GridEditDateCell
} from '@mui/x-data-grid-pro';

const StyledTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        },
}));

const EditInputField = props => {
    const { error } = props;

    return (
        <StyledTooltip open={!!error} title={error}>
            <GridEditInputCell {...props} />
        </StyledTooltip>
    );
};

const renderEditInputField = params => {
    return <EditInputField {...params} />
};

const EditDateField = props => {
    const { error } = props;

    return (
        <StyledTooltip open={!!error} title={error}>
            <GridEditDateCell {...props} />
        </StyledTooltip>
    );
};

const renderEditDateField = params => {
    return <EditDateField {...params} />
}

const TombTable = ({ rows, setRows, rowModesModel, setRowModesModel, slots, slotProps, loading, setLoading, setErrorDialog, setShowError }) => {

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

    const handleDeleteClick = (id) => () => {
        const makeRequest = async () => {
            try {
                setLoading(true);
    
                const res = await fetchUtil(`/lot/tomb/deceased?id=${id}`, { method: 'DELETE' });
    
                setRows(rows.filter((row) => row.id !== id));   
            } catch(error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };
        
        makeRequest();
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
        const makeRequest = async () => {
            try {
                setLoading(true);
                const res = await fetchUtil(`/lot/tomb/deceased?id=${newRow.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newRow)
                });

                const updatedRow = { ...newRow, isNew: false };
                setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
                return updatedRow;
            } catch(error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        return makeRequest();
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', flex: 1, editable: false },
        { field: 'first_name', headerName: 'First Name', flex: 1, editable: true, renderEditCell: renderEditInputField, preProcessEditCellProps: params => {
            return { ...params.props, error: !params.props.value && 'First name cannot be empty'}
        }},
        { field: 'middle_name', headerName: 'Middle Name', flex: 1, editable: true, renderEditCell: renderEditInputField, preProcessEditCellProps: params => {
            return { ...params.props, error: !params.props.value && 'Middle name cannot be empty' }
        }},
        { field: 'last_name', headerName: 'Last Name', flex: 1, editable: true, renderEditCell: renderEditInputField, preProcessEditCellProps: params => {
            return { ...params.props, error: !params.props.value && 'Last name cannot be empty' }
        }},
        { 
            field: 'born_date', 
            headerName: 'Birth Date', 
            flex: 1, 
            type: 'date', 
            editable: true,
            valueFormatter: (params) => dayjs(params.value).format('MM/DD/YYYY'), renderEditCell: renderEditDateField, preProcessEditCellProps: params => {
                const born_date = params.props.value;
                const { death_date } = params.row;
                const birthDate = new Date(born_date);
                const deathDate = new Date(death_date);

                if(Date.parse(birthDate) > Date.parse(deathDate)) {
                    return { ...params.props, error: 'Birth date cannot be later than death date' }
                } else return { ...params.props, error: !params.props.value && 'Invalid date' }
        }},
        { 
            field: 'death_date', 
            headerName: 'Death Date', 
            flex: 1, 
            type: 'date', 
            editable: true,
            valueFormatter: (params) => dayjs(params.value).format('MM/DD/YYYY'), renderEditCell: renderEditDateField, preProcessEditCellProps: params => {
                const death_date = params.props.value;
                const { born_date } = params.row;
                const birthDate = new Date(born_date);
                const deathDate = new Date(death_date);

                if(Date.parse(birthDate) > Date.parse(deathDate)) {
                    return { ...params.props, error: 'Death date cannot be earlier than birth date' }
                } else return { ...params.props, error: !params.props.value && 'Invalid date' }
        }},
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
    );
};

export default TombTable;