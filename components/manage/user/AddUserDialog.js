import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import fetchUtil from '@/utils/fetchUtil';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { TextField, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import ErrorText from '@/components/prompt/ErrorText';

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
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const saveUser = async () => {
      setError('');
      setLoading(true);

      const newUser = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        contact_num: contactNumber,
        admin_role: isAdmin,
        email, password, address
      };
  
      try {
        const res = await fetchUtil('/user', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser)
        });

        const data = await res.json();

        setFirstName('');
        setMiddleName('');
        setLastName('');
        setContactNumber('');
        setAddress('');
        setIsAdmin(false);
        setEmail('');
        setPassword('');

        handleSave(data);
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              <Typography variant="h6" component="span">
                  Add New User
              </Typography>
              {loading && <CircularProgress size="1rem" sx={{ marginLeft: 3 }}/>}
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 600 }}>
                <ErrorText>{error}</ErrorText>
                <TextField disabled={loading} label="Email" value={email} onChange={ (event) => {
                    setEmail(event.target.value);
                }} />
                <TextField disabled={loading} type="password" label="Password" value={password} onChange={ (event) => {
                    setPassword(event.target.value);
                }} />
                <TextField disabled={loading} label="First Name" value={firstName} onChange={ (event) => {
                    setFirstName(event.target.value);
                }} />
                <TextField disabled={loading} label="Middle Name" value={middleName} onChange={ (event) => {
                    setMiddleName(event.target.value);
                }} />
                <TextField disabled={loading} label="Last Name" value={lastName} onChange={ (event) => {
                    setLastName(event.target.value);
                }} />
                <TextField disabled={loading} label="Contact Number" value={contactNumber} onChange={ (event) => {
                    setContactNumber(event.target.value);
                }} />
                <TextField disabled={loading} label="Address" value={address} onChange={ (event) => {
                    setAddress(event.target.value);
                }} />
                <FormControlLabel control={<Checkbox checked={isAdmin}
                                                     onChange={() => setIsAdmin(event.target.checked)}/>} 
                                                     label="Give user admin privileges"
                                                     disabled={loading} />
                
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} autoFocus onClick={saveUser}>
                    Save changes
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}