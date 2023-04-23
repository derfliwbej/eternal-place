import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddUserDialog({ open, handleClose, handleSave }) {
    const [firstName, setFirstName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const saveUser = () => {
        // TODO: Make API call and id should come from backend
        const newUser = {
            id: 0, firstName, middleName, lastName, contactNumber, address, isAdmin,
            username, password
        };

        setFirstName('');
        setMiddleName('');
        setLastName('');
        setContactNumber('');
        setAddress('');
        setIsAdmin(false);
        setUsername('');
        setPassword('');

        handleSave(newUser);
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add New User
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 600 }}>
                <TextField label="Username" value={username} onChange={ (event) => {
                    setUsername(event.target.value);
                }} />
                <TextField type="password" label="Password" value={password} onChange={ (event) => {
                    setPassword(event.target.value);
                }} />
                <TextField label="First Name" value={firstName} onChange={ (event) => {
                    setFirstName(event.target.value);
                }} />
                <TextField label="Middle Name" value={middleName} onChange={ (event) => {
                    setMiddleName(event.target.value);
                }} />
                <TextField label="Last Name" value={lastName} onChange={ (event) => {
                    setLastName(event.target.value);
                }} />
                <TextField label="Contact Number" value={contactNumber} onChange={ (event) => {
                    setContactNumber(event.target.value);
                }} />
                <TextField label="Address" value={address} onChange={ (event) => {
                    setAddress(event.target.value);
                }} />
                <FormControlLabel control={<Checkbox checked={isAdmin}
                                                     onChange={() => setIsAdmin(event.target.checked)}/>} 
                                                     label="Give user admin privileges" />
                
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={saveUser}>
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}