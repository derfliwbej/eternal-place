import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
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

const IgnoreDateDifferenceDialog = ({ open, setShowIgnoreDialog, saveDeceased }) => {
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setShowIgnoreDialog(false);
  };

  const onSaveDeceased = async () => {
    setLoading(true);
    await saveDeceased();
    setLoading(false);
    setShowIgnoreDialog(false);
  };

  return (
    <BootstrapDialog open={open} onClose={handleClose}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {
        handleClose();
      }}>
        <Typography variant="h6" component="span">
            Confirm Adding Deceased
        </Typography>
        {loading && <CircularProgress size="1rem" sx={{ marginLeft: 3 }}/>}
      </BootstrapDialogTitle>

      <DialogContent>
        This tomb contains a deceased person that has died in the last 8 years. Are you sure you still want to add this newly deceased person?
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="warning" onClick={handleClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={onSaveDeceased} disabled={loading}>Confirm</Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default function AddDeceasedDialog({ id, open, handleClose, handleSave, setErrorDialog, setShowError, deceasedList }) {
    const [firstName, setFirstName] = React.useState({ value: '', error: false, helperText: '' });
    const [middleName, setMiddleName] = React.useState({ value: '', error: false, helperText: '' });
    const [lastName, setLastName] = React.useState({ value: '', error: false, helperText: '' });
    const [birthDate, setBirthDate] = React.useState({ value: '', helperText: '' });
    const [deathDate, setDeathDate] = React.useState({ value: '', helperText: '' });
    const [showIgnoreDialog, setShowIgnoreDialog] = React.useState(false);

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

      if(!birthDate.value || !deathDate.value) {
        hasError = true;
        setError('Dates cannot be empty.');
      }

      const currBirthDate = new Date(birthDate.value);
      const currDeathDate = new Date(deathDate.value);

      if(Date.parse(currBirthDate) > Date.parse(currDeathDate)) {
        hasError = true;
        setError('Birth date cannot be later than death date.');
      }

      return hasError;
    };

    const saveDeceased = async () => {
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
                born_date: dayjs(birthDate.value).format('YYYY-MM-DD'),
                death_date: dayjs(deathDate.value).format('YYYY-MM-DD')
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

        await makePostRequest();
    };

    const onDeceasedSave = () => {
      setError(''); 
      if(!validateForm()) {
        const currentDate = new Date();
        const mostRecentDeath = new Date(Math.max(...deceasedList.map( deceased => new Date(deceased.death_date))));

        if (currentDate.getFullYear() - mostRecentDeath.getFullYear() <= 8) {
          setShowIgnoreDialog(true);
        } else saveDeceased();
      }

      return;
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
                <DatePicker disabled={loading} label="Birth Date" value={birthDate.value} type="date" onChange={ (value) => {
                    setBirthDate({ ...birthDate, value });
                }}/>
                <DatePicker disabled={loading} label="Death Date" value={deathDate.value} type="date" onChange={ (value) => {
                    setDeathDate({ ...deathDate, value });
                }}/>
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} autoFocus onClick={onDeceasedSave}>
                    Save
                </Button>
            </DialogActions>
        </BootstrapDialog>
        <IgnoreDateDifferenceDialog open={showIgnoreDialog} setShowIgnoreDialog={setShowIgnoreDialog} saveDeceased={saveDeceased} />
        </LocalizationProvider>
    );
}