import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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

export default function ConfirmTombDeleteDialog({ open, id, handleClose, deleteTomb }) {

    const handleDelete = () => {
      deleteTomb(id);
      handleClose();
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Confirm Deletion
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 600 }}>
                Are you sure you want to delete Tomb with ID {id}?
            </DialogContent>
            <DialogActions>
                <Button autoFocus color="warning" type="contained" onClick={handleDelete}>
                    Delete
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}