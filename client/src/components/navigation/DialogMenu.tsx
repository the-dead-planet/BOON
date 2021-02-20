import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogProps } from '../../logic/types';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMenu = ({ open, handleClose, message, contextText, buttonOk }: DialogProps) => {
    // TODO: style it nicer
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{message}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{contextText}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={buttonOk.onClick}>{buttonOk.text}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogMenu;
