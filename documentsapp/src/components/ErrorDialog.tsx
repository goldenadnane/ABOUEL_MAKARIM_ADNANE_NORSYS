import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { AlertDialogProps } from '../types/alertDialogProps';

const ErrorDialog : React.FC<AlertDialogProps> = ({ errorMessag,open, onClose }) =>  {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <DialogContentText>{errorMessag}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;
