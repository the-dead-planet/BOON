// import React from 'react';
// import { makeStyles, createStyles } from '@mui/styles';
// import { Container, Grid, Typography } from '@mui/material';
// import RellaxWrapper from 'react-rellax-wrapper';
// import { User, Mode } from '../../logic/types';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         top: {
//             marginTop: theme.spacing(10),
//         },
//         height: {
//             minHeight: '100vh',
//         },
//     })
// );

// interface Props {
//     user: User;
//     mode: Mode;
//     onModeChange: (mode: Mode) => void;
//     title: string;
//     subtitle: string;
//     button: string;
// }

// // TODO: create a page with graphics moving in different speeds
// // Also apply to svg elements to "break" graphic apart
// // TODO: there is an error with typescript - create a new js component which receives property speed, to use inside tsx files
// const Parallax = ({ user, mode, onModeChange, title, subtitle, button }: Props) => {
//     const classes = useStyles();

//     return (
//         <Container maxWidth="lg" id="main-content" className={classes.top}>
//             <Grid container direction="row" className={classes.height}>
//                 <Grid item xs={4}>
//                     <RellaxWrapper
//                     // speed={2}
//                     >
//                         <Typography variant="h4" color="secondary">
//                             Fast
//                         </Typography>
//                     </RellaxWrapper>
//                 </Grid>

//                 <Grid item xs={4}>
//                     <RellaxWrapper
//                     // speed={-2}
//                     >
//                         <Typography variant="h4" color="secondary">
//                             Fast
//                         </Typography>
//                     </RellaxWrapper>
//                 </Grid>

//                 <Grid item xs={4}>
//                     <RellaxWrapper
//                     // speed={-4}
//                     >
//                         <Typography variant="h4" color="secondary">
//                             Fast
//                         </Typography>
//                     </RellaxWrapper>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Parallax;
