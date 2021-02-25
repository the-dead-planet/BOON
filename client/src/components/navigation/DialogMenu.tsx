import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogProps } from '../../logic/types';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMenu = ({ open, handleClose, message, contextText, content, buttonOk, fullScreen }: DialogProps) => {
    const theme = useTheme();
    const fullScreenBreakPoint = useMediaQuery(theme.breakpoints.down('xs'));

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
