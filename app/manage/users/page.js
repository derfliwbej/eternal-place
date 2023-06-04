'use client';
import DashboardLayout from '@/components/layouts/DashboardLayout';

import fetchUtil from '@/utils/fetchUtil';

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import UserTable from '@/components/manage/user/UserTable';
import AddUserDialog from '@/components/manage/user/AddUserDialog';

import { GridRowModes, GridToolbarContainer } from '@mui/x-data-grid';

const initialRows = [
    {
      id: 1,
      email: ' ',
      first_name: ' ',
      middle_name: ' ',
      last_name: ' ',
      contact_num: ' ',
      address: ' ',
      admin_role: false,
      username: ' '
    },
    {
      id: 2,
      email: ' ',
      first_name: ' ',
      middle_name: ' ',
      last_name: ' ',
      contact_num: ' ',
      address: ' ',
      admin_role: false,
      username: ' '
    },
];

function EditToolbar(props) {
  const { setOpen, loading } = props;

  const handleClick = () => {
      setOpen(true);  // Show modal
  };

  return (
      <GridToolbarContainer>
      <Button disabled={loading} variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClick}>
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
    const [loading, setLoading] = React.useState(true);

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

    React.useEffect(() => {
      setLoading(true);
      const fetchUsers = async () => {
        try {
          const res = await fetchUtil('/users');
          const data = await res.json();

          setRows(data);
        } catch(error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
        
      };

      fetchUsers();
    }, []);

    return (
        <>
            <DashboardLayout userType="admin">
                <h2 style={{ marginBottom: 20 }}>Manage Users</h2>
                <UserTable rows={rows}
                           setRows={setRows}
                           rowModesModel={rowModesModel}
                           setRowModesModel={setRowModesModel}
                           slots={{ 
                              toolbar: EditToolbar,
                           }}
                           slotProps={{ 
                              toolbar: { setOpen, loading },
                           }}
                           setLoading={setLoading}
                           loading={loading}
                           />
            </DashboardLayout>
            <AddUserDialog open={open} 
                           handleClose={handleModalClose}
                           handleSave={handleSave} />
        </>
    );
};

export default ManageUsersPage;