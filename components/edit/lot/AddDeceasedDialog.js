import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import fetchUtil from '@/utils/fetchUtil';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ErrorText from '@/components/prompt/ErrorText';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField, Typography, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

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

export default function AddDeceasedDialog({ id, open, handleClose, handleSave, setErrorDialog, setShowError }) {
    const [firstName, setFirstName] = React.useState({ value: '', error: false, helperText: '' });
    const [middleName, setMiddleName] = React.useState({ value: '', error: false, helperText: '' });
    const [lastName, setLastName] = React.useState({ value: '', error: false, helperText: '' });
    const [birthDate, setBirthDate] = React.useState('');
    const [deathDate, setDeathDate] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

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

      return hasError;
    };

    const saveDeceased = () => {
        setFirstName({ ...firstName, error: false, helperText: '' });
        setMiddleName({ ...middleName, error: false, helperText: '' });
        setLastName({ ...lastName, error: false, helperText: '' });

        const makePostRequest = async () => {
          try {
            setError('');
            setLoading(true);
            const res = await fetchUtil(`/lot/tomb/deceased?id=${id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                first_name: firstName.value,
                middle_name: middleName.value,
                last_name: lastName.value,
                born_date: birthDate,
                death_date: deathDate
              })
            });

            const deceased = await res.json();

            handleSave(deceased);
          } catch(error) {
            setError(error.message);
          } finally {
            setFirstName({ value: '', error: false, helperText: '' });
            setMiddleName({ value: '', error: false, helperText: '' });
            setLastName({ value: '', error: false, helperText: '' });
            setBirthDate({ value: '', error: false, helperText: '' });
            setDeathDate({ value: '', error: false, helperText: '' });
            setLoading(false);
          }
        };

        if (validateForm()) return;
        else makePostRequest();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {
              setError('');
              handleClose();
            }}>
              <Typography variant="h6" component="span">
                  Add New Deceased
              </Typography>
              {loading && <CircularProgress size="1rem" sx={{ marginLeft: 3 }}/>}
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 600 }}>
                {error && <ErrorText>{error}</ErrorText>}
                <TextField disabled={loading} label="First Name" value={firstName.value} error={firstName.error} helperText={firstName.helperText} onChange={ (event) => {
                    setFirstName({ ...firstName, value: event.target.value });
                }} />
                <TextField disabled={loading} label="Middle Name" value={middleName.value} error={middleName.error} helperText={middleName.helperText} onChange={ (event) => {
                    setMiddleName({ ...middleName, value: event.target.value });
                }} />
                <TextField disabled={loading} label="Last Name" value={lastName.value} error={lastName.error} helperText={lastName.helperText} onChange={ (event) => {
                    setLastName({ ...lastName, value: event.target.value });
                }} />
                <DatePicker disabled={loading} label="Birth Date" value={birthDate} type="date" onChange={ (value) => {
                    setBirthDate(value);
                }} />
                <DatePicker disabled={loading} label="Death Date" value={deathDate} type="date" onChange={ (value) => {
                    setDeathDate(value);
                }} />
                
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} autoFocus onClick={saveDeceased}>
                    Save
                </Button>
            </DialogActions>
        </BootstrapDialog>
        </LocalizationProvider>
    );
}