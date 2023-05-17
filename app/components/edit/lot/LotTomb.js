import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import fetchUtil from '@/utils/fetchUtil';
import TombTable from './TombTable';
import AddDeceasedDialog from './AddDeceasedDialog';
import ErrorDialog from '@/app/components/prompt/ErrorDialog';

import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';

import ConfirmTombDeleteDialog from './ConfirmTombDeleteDialog';

function EditToolbar(props) {
    const { setAddModalOpen, setDeleteModalOpen } = props;
  
    const handleAddClick = () => {
        setAddModalOpen(true);
    };

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };
  
    return (
        <GridToolbarContainer>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
                Add deceased
            </Button>
            <Button variant="contained" color="warning" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
                Delete tomb
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setAddModalOpen: PropTypes.func.isRequired,
};

const LotTomb = ({ id, deceasedList, deleteTomb }) => {
    const [rows, setRows] = React.useState(deceasedList);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const [addModalOpen, setAddModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const [errorDialog, setErrorDialog] = React.useState({ title: '', message: '' });
    const [showError, setShowError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
    };

    const handleTombDelete = () => {
        const tombDelete = async () => {
            try {
                setLoading(true);
    
                const res = await fetchUtil(`/lot/tomb?id=${id}`, { method: 'DELETE' });
                deleteTomb(id);
    
            } catch(error) {
                setErrorDialog({ title: 'Error', message: error.message });
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        tombDelete();
    };

    const handleSave = (deceased) => {
        setRows((oldRows) => [...oldRows, {...deceased, isNew: true }]);
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [deceased.id]: { mode: GridRowModes.View }
        }));
        setAddModalOpen(false);
    };
  
    return (
        <div>
            <h3>Tomb {id}</h3>
            <TombTable rows={rows}
                       setRows={setRows}
                       rowModesModel={rowModesModel}
                       setRowModesModel={setRowModesModel}
                       slots={{
                        toolbar: EditToolbar
                       }}
                       slotProps={{
                        toolbar: { setAddModalOpen, setDeleteModalOpen }
                       }}
                       loading={loading}
            />
            <AddDeceasedDialog open={addModalOpen} handleClose={handleAddModalClose} handleSave={handleSave} />
            <ConfirmTombDeleteDialog id={id} loading={loading} open={deleteModalOpen} handleClose={handleDeleteModalClose} handleTombDelete={handleTombDelete} />
            <ErrorDialog title={errorDialog.title} message={errorDialog.message} open={showError} setOpen={setShowError} /> 
        </div>
    );
};

export default LotTomb;