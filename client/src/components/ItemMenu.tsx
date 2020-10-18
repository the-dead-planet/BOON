import React from 'react';
import { MenuList, MenuItem, ClickAwayListener, Popper, Paper, Grow, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface Props {
    items: Array<{ name: any; onClick: any }>;
    icon?: any;
}

export const ItemMenu = ({ items, icon }: Props) => {
    // For menu with options: delete, report etc
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const style = { zIndex: 100 };

    return (
        <>
            <IconButton
                ref={anchorRef}
                color="primary"
                aria-label="comment options"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {icon ? icon : <MoreHorizIcon />}
            </IconButton>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={style}
                placement="bottom"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper style={{ marginTop: '-1em' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {items.map((item) => (
                                        <MenuItem color="inherit" onClick={item.onClick}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};
