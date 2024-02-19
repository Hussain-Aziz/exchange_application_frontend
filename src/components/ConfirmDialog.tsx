import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function ConfirmDialog({action, open, setOpen, onConfirm}: {action: string, open: boolean, setOpen: (open: boolean) => void, onConfirm?: () => void}): JSX.Element {
  const handleClose = (answer: string) => {
    console.log(answer);
    setOpen(false);
    if (answer === 'yes' && onConfirm !== undefined) {
      onConfirm();
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose('no')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Are you sure you want to ${action}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to ${action}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('no')} variant='contained'>
            No
          </Button>
          <Button onClick={() => handleClose('yes')} variant='contained' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}