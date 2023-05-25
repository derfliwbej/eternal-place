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
    const [firstName, setFirstName] = React.useState({ value: '', error: false, helperText: '' });
    const [middleName, setMiddleName] = React.useState({ value: '', error: false, helperText: '' });
    const [lastName, setLastName] = React.useState({ value: '', error: false, helperText: '' });
    const [contactNumber, setContactNumber] = React.useState({ value: '', error: false, helperText: '' });
    const [address, setAddress] = React.useState({ value: '', error: false, helperText: '' });
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [email, setEmail] = React.useState({ value: '', error: false, helperText: '' });
    const [password, setPassword] = React.useState({ value: '', error: false, helperText: '' });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const validateForm = () => {
      let hasError = false;
      if (!firstName.value) {
        hasError = true;
        setFirstName({ ...firstName, error: true, helperText: 'Cannot be empty.' });
      }

      if (!middleName.value) {
        hasError = true;
        setMiddleName({ ...middleName, error: true, helperText: 'Cannot be empty.' });
      }

      if (!lastName.value) {
        hasError = true;
        setLastName({ ...lastName, error: true, helperText: 'Cannot be empty.' });
      }

      if (!/[0-9]+/.test(contactNumber.value) || !contactNumber.value) {
        hasError = true;
        setContactNumber({ ...contactNumber, error: true, helperText: 'Invalid contact number.' });
      }

      if (!email.value) {
        hasError = true;
        setEmail({ ...email, error: true, helperText: 'Cannot be empty.' });
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        hasError = true;
        setEmail({ ...email, error: true, helperText: 'Invalid email.' });
      }

      if (!password.value) {
        hasError = true;
        setPassword({ ...password, error: true, helperText: 'Cannot be empty.' });
      }

      if (!address.value) {
        hasError = true;
        setAddress({ ...address, error: true, helperText: 'Cannot be empty.' });
      }

      if (hasError) return true;
      return false;
    };

    const saveUser = () => {
      setFirstName({ ...firstName, error: false, helperText: '' });
      setMiddleName({ ...middleName, error: false, helperText: '' });
      setLastName({ ...lastName, error: false, helperText: '' });
      setContactNumber({ ...contactNumber, error: false, helperText: '' });
      setAddress({ ...address, error: false, helperText: '' });
      setIsAdmin(false);
      setEmail({ ...email, error: false, helperText: '' });
      setPassword({ ...password, error: false, helperText: '' });

      const makeRequest = async () => {
        const newUser = {
          first_name: firstName.value,
          middle_name: middleName.value,
          last_name: lastName.value,
          contact_num: contactNumber.value,
          admin_role: isAdmin,
          email: email.value, 
          password: password.value, 
          address: address.value
        };
    
        try {
          setError('');
          setLoading(true);
          const res = await fetchUtil('/user', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
          });
  
          const data = await res.json();
  
          setFirstName({ value: '', error: false, helperText: '' });
          setMiddleName({ value: '', error: false, helperText: '' });
          setLastName({ value: '', error: false, helperText: '' });
          setContactNumber({ value: '', error: false, helperText: '' });
          setAddress({ value: '', error: false, helperText: '' });
          setIsAdmin(false);
          setEmail({ value: '', error: false, helperText: '' });
          setPassword({ value: '', error: false, helperText: '' });
  
          handleSave(data);
        } catch(error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      if (validateForm()) return;
      else makeRequest();
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
                <TextField disabled={loading} error={email.error} helperText={email.helperText} label="Email" value={email.value} onChange={ (event) => {
                    setEmail({ ...email, value: event.target.value });
                }} />
                <TextField disabled={loading} error={password.error} helperText={password.helperText} type="password" label="Password" value={password.value} onChange={ (event) => {
                    setPassword({ ...password, value: event.target.value });
                }} />
                <TextField disabled={loading} error={firstName.error} helperText={firstName.helperText} label="First Name" value={firstName.value} onChange={ (event) => {
                    setFirstName({ ...firstName, value: event.target.value });
                }} />
                <TextField disabled={loading} error={middleName.error} helperText={middleName.helperText} label="Middle Name" value={middleName.value} onChange={ (event) => {
                    setMiddleName({ ...middleName, value: event.target.value });
                }} />
                <TextField disabled={loading} error={lastName.error} helperText={lastName.helperText} label="Last Name" value={lastName.value} onChange={ (event) => {
                    setLastName({ ...lastName, value: event.target.value });
                }} />
                <TextField disabled={loading} error={contactNumber.error} helperText={contactNumber.helperText} label="Contact Number" value={contactNumber.value} onChange={ (event) => {
                    setContactNumber({ ...contactNumber, value: event.target.value });
                }} />
                <TextField disabled={loading} error={address.error} helperText={address.helperText} label="Address" value={address.value} onChange={ (event) => {
                    setAddress({ ...address, value: event.target.value });
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