import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import LotOwnerTable from './LotOwnerTable';
import AddOwnerDialog from './AddOwnerDialog';

import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';

function EditToolbar(props) {
    const { setAddModalOpen } = props;
  
    const handleAddClick = () => {
        setAddModalOpen(true);
    };
  
    return (
        <GridToolbarContainer>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
                Add owner
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setAddModalOpen: PropTypes.func.isRequired,
};

const LotOwners = ({ lotID, owners }) => {
    const [rows, setRows] = React.useState(owners);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const [addModalOpen, setAddModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    const handleDeleteModalClose = () => {
        setDeleteModalOpen(false);
    };

    const handleSave = (owner) => {
        setRows((oldRows) => [...oldRows, {...owner, isNew: true }]);
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [owner.id]: { mode: GridRowModes.View }
        }));
        setAddModalOpen(false);
    };
  
    return (
        <div>
            <h2>Lot Owners</h2>
            <LotOwnerTable  rows={rows}
                            setRows={setRows}
                            rowModesModel={rowModesModel}
                            setRowModesModel={setRowModesModel}
                            slots={{
                                toolbar: EditToolbar
                            }}
                            slotProps={{
                                toolbar: { setAddModalOpen }
                            }}
                            lotID={lotID}
            />
            <AddOwnerDialog lotID={lotID} open={addModalOpen} handleClose={handleAddModalClose} handleSave={handleSave} />
        </div>
    );
};

export default LotOwners;