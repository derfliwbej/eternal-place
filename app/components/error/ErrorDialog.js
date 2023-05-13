import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

const ErrorDialog = ({ title, message, open, setOpen }) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <BootstrapDialog open={open} onClose={handleClose}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {message}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    OK
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default ErrorDialog;