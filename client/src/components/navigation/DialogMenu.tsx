import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TransitionProps } from '@mui/material/transitions';
import { DialogProps } from '../../logic/types';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactNode },
    ref: React.Ref<unknown>
) {
    // TODO: Test this
    return <Slide direction="up" ref={ref} {...props}><div /></Slide>;
});

const DialogMenu = ({ open, handleClose, message, contextText, content, buttonOk, fullScreen }: DialogProps) => {
    const fullScreenBreakPoint = useMediaQuery((_theme: Theme) =>'500px');
    // const fullScreenBreakPoint = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

    // TODO: style it nicer
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                fullScreen={fullScreen ? fullScreenBreakPoint : undefined}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{message}</DialogTitle>

                {contextText && (
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">{contextText}</DialogContentText>
                    </DialogContent>
                )}

                {content}

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={buttonOk.onClick}>{buttonOk.text}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogMenu;
