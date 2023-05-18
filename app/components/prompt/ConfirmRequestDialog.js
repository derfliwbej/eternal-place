import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';

import { Button, CircularProgress, Typography } from '@mui/material';
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

export default function ConfirmRequestDialog({ title, body, open, loading, onConfirm, onClose }) {
    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
              <Typography variant="h6" component="span">
                  {title}
              </Typography>
              {loading && <CircularProgress size="1rem" sx={{ marginLeft: 3 }}/>}
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 600 }}>
                {body}
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} autoFocus type="contained" onClick={onConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}