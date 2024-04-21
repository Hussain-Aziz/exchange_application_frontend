import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function DelegateDialog({ open, setOpen, onConfirm }: { open: boolean, setOpen: (open: boolean) => void, onConfirm?: (email: string) => void }): JSX.Element {
  const [email, setEmail] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = (email:string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsValidEmail(re.test(String(email).toLowerCase()));
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    if (onConfirm !== undefined) {
      onConfirm(email);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Please enter the faculty email`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleClose} variant='contained' disabled={!isValidEmail}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}