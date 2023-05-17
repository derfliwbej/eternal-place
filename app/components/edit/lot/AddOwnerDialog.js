import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import fetchUtil from '@/utils/fetchUtil';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TextField, Typography, CircularProgress } from '@mui/material';
import ErrorText from '@/app/components/prompt/ErrorText';

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

export default function AddOwnerDialog({ lotID, open, handleClose, handleSave }) {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const saveOwner = async () => {
        setError('');
        setLoading(true);

        try {
          const res = await fetchUtil('/lot/owner', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, lot_id: lotID })
          });

          const data = await res.json();

          setEmail('');
          handleSave(data);
        } catch (error) {
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
                  Add New Owner
              </Typography>
              {loading && <CircularProgress size="1rem" sx={{ marginLeft: 3 }}/>}
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, minWidth: 300 }}>
                <ErrorText>{error}</ErrorText>
                <TextField sx={{ width: '100%' }}disabled={loading} label="Enter owner's email" value={email} onChange={ event => setEmail(event.target.value) }/>
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} autoFocus onClick={saveOwner}>
                    Add
                </Button>
                <Button disabled={loading} type="warning" onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}