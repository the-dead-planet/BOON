import React from 'react';
import { Link } from '../utils/Link';
import { makeStyles, createStyles } from '@mui/styles';
import { MenuList, MenuItem, ClickAwayListener, Popper, Paper, Grow, Tooltip, Typography, Theme } from '@mui/material';
import { IconButton } from './mui-styled/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        onTop: {
            zIndex: 100,
        },
        menu: {
            marginTop: '-1em',
        },
    })
);

export interface Item {
    name: string;
    onClick: () => void;
    path?: string;
    alarm?: boolean;
}

interface Props {
    items: Item[];
    icon?: React.ReactNode;
    tooltip?: string;
    placement?:
        | 'bottom'
        | 'left'
        | 'right'
        | 'top'
        | 'bottom-end'
        | 'bottom-start'
        | 'left-end'
        | 'left-start'
        | 'right-end'
        | 'right-start'
        | 'top-end'
        | 'top-start'
        | undefined;
}

export const ItemMenu = ({ items, icon, tooltip, placement }: Props) => {
    const classes = useStyles();

    // For menu with options: delete, report etc
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
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

    return (
        <>
            <Tooltip title={tooltip || ''} arrow>
                <IconButton
                    ref={anchorRef}
                    aria-label="comment options"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    {icon ? icon : <MoreHorizIcon />}
                </IconButton>
            </Tooltip>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement={placement}
                className={classes.onTop}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper className={classes.menu}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {items.map((item) => (
                                        <MenuItem color="inherit" onClick={item.onClick}>
                                            {item?.path ? (
                                                <Link to={item.path}>
                                                    <Typography
                                                        variant="body2"
                                                        color={item?.alarm ? 'secondary' : 'textPrimary'}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </Link>
                                            ) : (
                                                <Typography
                                                    variant="body2"
                                                    color={item?.alarm ? 'secondary' : 'textPrimary'}
                                                >
                                                    {item.name}
                                                </Typography>
                                            )}
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
