import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import TombTable from './TombTable';
import AddDeceasedDialog from './AddDeceasedDialog';

import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';

import ConfirmTombDeleteDialog from './ConfirmTombDeleteDialog';

const initialRows = [
    {
        id: 1,
        firstName: 'Jeb Wilfred',
        middleName: 'Deduyo',
        lastName: 'Panganiban',
      },
];

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

const LotTomb = ({ id, rowsProp }) => {
    const [rows, setRows] = React.useState(rowsProp || initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const [addModalOpen, setAddModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
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
            />
            <AddDeceasedDialog open={addModalOpen} handleClose={handleAddModalClose} handleSave={handleSave} />
            <ConfirmTombDeleteDialog id={id} open={deleteModalOpen} handleClose={handleDeleteModalClose} />
        </div>
    );
};

export default LotTomb;