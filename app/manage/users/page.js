'use client';
import DashboardLayout from '@/app/components/layouts/DashboardLayout';

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import UserTable from '@/app/components/manage/user/UserTable';
import AddUserDialog from '@/app/components/manage/user/AddUserDialog';

import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';

const initialRows = [
    {
      id: 1,
      firstName: 'Jeb Wilfred',
      middleName: 'Deduyo',
      lastName: 'Panganiban',
      contactNumber: '09171585277',
      address: 'Sariaya, Quezon',
      isAdmin: false,
      username: 'jwdp'
    },
    {
        id: 2,
        firstName: 'Welfredo',
        middleName: 'Macalalad',
        lastName: 'Panganiban',
        contactNumber: '09123456789',
        address: 'Sariaya, Quezon',
        isAdmin: true,
        username: 'wmpanganiban'
    }
];

function EditToolbar(props) {
  const { setOpen } = props;

  const handleClick = () => {
      // setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      // setRowModesModel((oldModel) => ({
      // ...oldModel,
      // [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      // }));
      // setRows((oldRows) => [...oldRows, { id: 0, firstName: 'Jeb' }])
      setOpen(true);  // Show modal
  };

  return (
      <GridToolbarContainer>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add user
      </Button>
      </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const ManageUsersPage = () => {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const [open, setOpen] = React.useState(false);

    const handleModalClose = () => {
      setOpen(false);
    };

    const handleSave = (user) => {
      setRows((oldRows) => [...oldRows, {...user, isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [user.id]: { mode: GridRowModes.View }
      }));
      setOpen(false);
    };

    return (
        <>
            <DashboardLayout userType="admin">
                <h3 style={{ marginBottom: 20 }}>Manage Users</h3>
                <UserTable rows={rows}
                           setRows={setRows}
                           rowModesModel={rowModesModel}
                           setRowModesModel={setRowModesModel}
                           slots={{ 
                              toolbar: EditToolbar,
                           }}
                           slotProps={{ 
                              toolbar: { setOpen },
                           }}
                           />
            </DashboardLayout>
            <AddUserDialog open={open} 
                           handleClose={handleModalClose}
                           handleSave={handleSave} />
        </>
    );
};

export default ManageUsersPage;