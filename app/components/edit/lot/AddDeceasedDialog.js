import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
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

export default function AddDeceasedDialog({ open, handleClose, handleSave }) {
    const [firstName, setFirstName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [birthDate, setBirthDate] = React.useState('');
    const [deathDate, setDeathDate] = React.useState('');

    const saveDeceased = () => {
        // TODO: Make API call and id should come from backend
        const newDeceased = {
            id: 0, firstName, middleName, lastName, birthDate, deathDate
        };

        setFirstName('');
        setMiddleName('');
        setLastName('');
        setBirthDate('');
        setDeathDate('');

        handleSave(newDeceased);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add New Deceased
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 600 }}>
                <TextField label="First Name" value={firstName} onChange={ (event) => {
                    setFirstName(event.target.value);
                }} />
                <TextField label="Middle Name" value={middleName} onChange={ (event) => {
                    setMiddleName(event.target.value);
                }} />
                <TextField label="Last Name" value={lastName} onChange={ (event) => {
                    setLastName(event.target.value);
                }} />
                <DatePicker label="Birth Date" value={birthDate} type="date" onChange={ (value) => {
                    setBirthDate(value);
                }} />
                <DatePicker label="Death Date" value={deathDate} type="date" onChange={ (value) => {
                    setDeathDate(value);
                }} />
                
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={saveDeceased}>
                    Save
                </Button>
            </DialogActions>
        </BootstrapDialog>
        </LocalizationProvider>
    );
}