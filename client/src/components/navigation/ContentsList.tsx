import { makeStyles, createStyles } from '@mui/styles';
import { HashLink } from '../../utils/Link';
import { List, ListItem, Typography, Theme } from '@mui/material';
import { LinkTo } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: {
            fontWeight: 'bold',
        },
    })
);

interface Props {
    title?: string;
    items: Array<LinkTo>;
}

// TODO: investigate why Link from router does not handle hashes #
const ContentsList = ({ title, items }: Props) => {
    const classes = useStyles();

    return (
        <List>
            {title && <ListItem className={classes.bold}>{title}</ListItem>}

            {items.map((item, i) => (
                <HashLink key={`link-item-${i}`} to={`#${item.path}` || '/'}>
                    <ListItem key={`item-${i}`} button>
                        <Typography key={`item-text-${i}`} variant="body2" title={item.name} gutterBottom noWrap>
                            {item.name}
                        </Typography>
                    </ListItem>
                </HashLink>
            ))}
        </List>
    );
};

export default ContentsList;
