import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField } from '@mui/material';

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

export default function AddOwnerDialog({ open, handleClose, handleSave }) {
    const [username, setUsername] = React.useState('');

    const saveOwner = () => {
        // TODO: Make API call for adding owner
        const newOwner = {
            id: 0, username
        };

        setUsername('');

        handleSave(newOwner);
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add new owner
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 300 }}>
                <TextField label="Enter owner's username" value={username} onChange={ event => setUsername(event.target.value) }/>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={saveOwner}>
                    Add
                </Button>
                <Button type="warning" onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}