import React from 'react';
import { useStyles } from '../../styles/landing';
// import { Link } from '../../utils/Link';
import { Container, Box, Grid, Typography } from '@material-ui/core';
// import { Mode, User } from '../../logic/types';
import bed from '../../img/content/interior/bed.jpg';
import couch from '../../img/content/interior/couch.jpg';
import hall from '../../img/content/interior/hall.jpg';
import lightBulbs from '../../img/content/interior/light-bulbs.jpg';
import tableDecoration from '../../img/content/interior/table-decoration.jpg';
import table from '../../img/content/interior/table.jpg';
import wall from '../../img/content/interior/wall.jpg';
import { Landing } from '../../logic/types';
import { ShowInViewport, ShowSlideInViewport, ViewportImage } from '../../utils/InViewPort';

const Content = ({ user, mode, setMode, title, subtitle, button }: Landing) => {
    const classes = useStyles();
    const contents = [
        {
            title: 'Pastry I love cotton candy cake halvah',
            text:
                'Sweet tootsie roll dessert bonbon tart. Tiramisu chocolate cake cotton candy ice cream croissant icing. Topping icing topping gummies.',
            img: table,
        },
        {
            title: 'Carrot cake I love sweet roll macaroon gummies',
            text:
                'Ice cream sesame snaps pastry. Tootsie roll tootsie roll lollipop cotton candy soufflé cupcake marzipan gummies. Cake lemon drops bear claw cupcake.',
            img: tableDecoration,
        },
        {
            title: 'Tart croissant powder',
            text:
                'Chupa chups ice cream jelly. Wafer lollipop chocolate bar. Tiramisu lemon drops oat cake sweet sesame snaps marshmallow. Macaroon sweet sweet roll lemon drops toffee.',
            img: bed,
        },
        {
            title: 'Lollipop dessert halvah bear claw',
            text:
                'Jujubes cake wafer sweet pudding topping candy canes. Tiramisu bonbon carrot cake lemon drops powder. Danish marshmallow apple pie pudding danish chupa chups. Marzipan danish toffee oat cake chocolate liquorice chocolate.',
            img: couch,
        },
        {
            title: 'Jelly chupa chups toffee icing',
            text:
                'Tootsie roll lemon drops pie jujubes cotton candy liquorice. Sugar plum biscuit marshmallow icing candy bear claw. Wafer marshmallow marshmallow.',
            img: lightBulbs,
        },
        {
            title: 'Fruitcake soufflé jelly-o powder bear claw icing chocolate cake',
            text:
                'Chocolate icing apple pie marzipan. Marshmallow sugar plum cake marzipan tootsie roll tiramisu candy. Jujubes chocolate cake sesame snaps dragée pastry candy canes jelly-o cake. Jelly-o icing dragée jelly-o.',
            img: wall,
        },
        {
            title: 'I love marzipan apple pie',
            text:
                'Gummi bears jujubes chocolate topping. Tart marzipan sesame snaps croissant caramels chocolate dessert. Lemon drops sesame snaps donut. Tart dessert macaroon cake cotton candy apple pie liquorice lollipop donut.',
            img: hall,
        },
    ];
    // TODO: Change this content to something which makes more sense, now it's quite a mess
    return (
        <>
            <Container maxWidth="md" id="main-content" className={classes.contentContainer}>
                <Grid container direction="column" justify="center" alignItems="center" className={classes.gridContent}>
                    <ShowInViewport>
                        <Typography variant="h1" gutterBottom className={classes.contentTitle}>
                            Cupcake halvah toffee bonbon
                        </Typography>
                    </ShowInViewport>

                    {contents.map((item, i) => (
                        <React.Fragment key={i}>
                            <Typography variant="h3" gutterBottom className={classes.contentItemTitle}>
                                {item.title}
                            </Typography>
                            <Typography variant="h4" gutterBottom className={classes.contentItemBody}>
                                {item.text}
                            </Typography>

                            <ViewportImage src={item.img} />
                        </React.Fragment>
                    ))}
                </Grid>
            </Container>
            <ShowSlideInViewport>
                <Typography gutterBottom className={classes.messageTitle}>
                    Fruitcake cotton candy jelly beans croissant.
                </Typography>
                <Typography className={classes.messageSubtitle}>Cake bear claw donut gummi bears.</Typography>
                <Typography gutterBottom className={classes.messageBody}>
                    Caramels sesame snaps topping pastry muffin chupa chups gummies cake.
                </Typography>
            </ShowSlideInViewport>
        </>
    );
};

export default Content;
