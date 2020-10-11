/* 
    The purpose of this file is to integrate all styles in one place and reuse classes in various components
*/
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// Below components need to be imported to correctly overwrite styles with classes in useStyle
const landing1 = require('../img/landing/landing-1.png');
const landing2 = require('../img/landing/landing-2.png');
const landing3 = require('../img/landing/landing-3.png');
const landing4 = require('../img/landing/landing-4.png');
const landing5 = require('../img/landing/landing-5.png');

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        /* 
            For Animations page. Notes:
            Material-ui handles pseudo elements and animations in a specific way. Pay attention to:
            - pseudo elements go inside a class and are named "$:<name>" ("$::before" , "$::hover")
            - content style need to be 'double quoted' to work, so content: "''" or content: "'before'"
            - keyframes can be defined by a name in double quotes, e.g. "@keyframes anim: { "0%": {...}, "100%": {...}, }"
            - animation names must be prefixed with $, so: animation: "$anim 2s ease-in"
            - animation timing function property (ease in etc) can use theme provider theme.transitions.easing.easeOut
            - images need to be imported (import image from '../img/image.png)' and referred to as relative path in background properties
                e.g. background: `url(${image})`. Otherwise they won't be displayed (do not use background: url('../img/image.png)).
            
            Useful links:
            - https://cubic-bezier.com/
        */
        jsLoading: {
            '@global': {
                '*': {
                    animationPlayState: 'paused !important',
                },
            },
            '&::before': {
                animationPlayState: 'paused !important',
            },
            '&::after': {
                animationPlayState: 'paused !important',
            },
        },
        headerContainer: {
            position: 'relative',
        },
        navButtons: {
            position: 'absolute',
            right: 0,
            top: 0,
        },
        headerText: {
            padding: '2em 0',
            textAlign: 'center',
        },
        headerDivider: {
            overflow: 'visible' /* For IE */,
            width: '90%',
            height: '30px',
            borderStyle: 'solid',
            borderColor: theme.palette.primary.main,
            borderWidth: '1px 0 0 0',
            borderRadius: '20px',
            '&::before': {
                display: 'block',
                content: "''",
                height: '30px',
                marginTop: '-31px',
                borderStyle: 'solid',
                borderColor: theme.palette.primary.main,
                borderWidth: '0 0 1px 0',
                borderRadius: '20px',
            },
        },
        divider: {
            margin: '1em !important',
            backgroundColor: theme.palette.primary.main,
        },
        topButtons: {
            position: 'absolute',
            top: 0,
            '&$right': {
                right: '2em',
                left: 'auto',
            },
            '&$left': {
                left: '2em',
                right: 'auto',
            },
        },
        left: {},
        right: {},
        definitions: {
            padding: '0 1em',
        },
        textDecor: {
            fontStyle: 'italic',
        },
        example: {
            padding: '.5em 2em 1em 2em',
            fontStyle: 'italic',
        },
        enterContainer: {
            margin: '5em 0',
        },
        enterButton: {
            padding: '.5em',
            textAlign: 'center',
            border: `solid .2em ${theme.palette.secondary.main}`,
            boxShadow: `0 0 ${theme.palette.secondary.dark}`,
            transition: 'box-shadow .1s linear',
            '&:hover': {
                cursor: 'pointer',
                // transform: "translate(-.2em, -.2em)",
                transition: 'box-shadow .1s linear',
                boxShadow: `.2em .2em ${theme.palette.secondary.dark}`,
            },
        },
        contents: {
            marginTop: '5em',
        },
        background: {
            backgroundColor: '#000',
        },
        headerSimple: {
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1em',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            perspective: '100px',
            position: 'relative',
            textAlign: 'center',
            color: 'white',
            transformStyle: 'preserve-3d',
        },
        headerDownArrow: {
            position: 'absolute',
            bottom: '4vh',
            left: '0',
            right: '0',
            margin: '0 auto',
            zIndex: 20,
            transform: 'translateY(4rem)',
            // animation: `$fade-slide-up .5s 1s ease-out forwards, $pulse 2s 3s ease-out infinite`,
            animation: `$no-transform 1s 4s ease-out forwards, $pulse 2s 5s ease-out infinite`,
            opacity: 0,
        },
        // To remove redundancy in the other keyframe
        '@keyframes no-transform': {
            '100%': {
                opacity: '1',
                transform: 'none',
            },
        },
        '@keyframes pulse': {
            '0%': {
                opacity: 1,
                transform: 'none',
            },
            '50%': {
                opacity: 0.8,
                transform: 'scale(.8)',
            },
            '100%': {
                opacity: 1,
                transform: 'none',
            },
        },
        // BOON landing
        landingHeader: {
            zIndex: 1,
            position: 'relative',
            height: '90vh',
            marginTop: '10vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            textShadow: '2px 2px 4px #000000',
            animation: '$colorAnim 30s ease-in-out infinite',
        },

        offset: {
            padding: '0.2em',
        },
        slideshow: {
            backgroundColor: '#000',
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 0,
            listStyle: 'none',
            margin: 0,
            padding: 0,
            '& li': {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                backgroundRepeat: 'no-repeat' /* images wont repeat horiz or vert*/,
                opacity: 0,
                zIndex: 0,
                animation: '$imageAnimation 30s linear infinite' /* linear - the same speed from beg to end*/,
            },
            '& li:nth-child(1)': {
                backgroundImage: `url(${landing1})`,
            },
            '& li:nth-child(2)': {
                backgroundImage: `url(${landing2})`,
                animationDelay: '6s',
            },
            '& li:nth-child(3)': {
                backgroundImage: `url(${landing3})`,
                animationDelay: '12s',
            },
            '& li:nth-child(4)': {
                backgroundImage: `url(${landing4})`,
                animationDelay: '18s',
            },
            '& li:nth-child(5)': {
                backgroundImage: `url(${landing5})`,
                animationDelay: '24s',
            },
        },
        '@keyframes imageAnimation': {
            '0%': {
                opacity: 0,
                animationTimingFunction: 'ease-in',
            },
            '10%': {
                opacity: 1,
                animationTimingFunction: 'ease-out',
            },
            '20%': {
                opacity: 1,
            },
            '30%': {
                opacity: 0,
            },
        },
        btnSlideshow: {
            boxShadow: '0px 0px 8px 4px',
            border: 'solid 1px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
            margin: '0.4em',
            padding: '0.45em 0.7em',
            fontWeight: 'bold',
            fontSize: '1.2em',
            textDecoration: 'none',
            animation: '$colorAnim 30s ease-in-out infinite',
            cursor: 'pointer',
            '&:hover': {
                boxShadow: '0px 0px 8px 8px',
                /* background-color: rgba(0,0,0, 0.7); */
            },
        },

        '@keyframes colorAnim': {
            '0%': {
                color: 'rgb(26, 11, 230)',
            },
            '10%': {
                color: 'purple',
            },
            '20%': {
                color: 'purple',
            },
            '30%': {
                color: '#db2828',
            },
            '40%': {
                color: '#db2828',
            },
            '50%': {
                color: 'rgb(156, 156, 13)',
            },
            '60%': {
                color: 'rgb(156, 156, 13)',
            },
            '70%': {
                color: 'rgb(7, 109, 7)',
            },
            '80%': {
                color: 'rgb(7, 109, 7)',
            },
            '90%': {
                color: 'rgb(26, 11, 230)',
            },
            '100%': {
                color: 'rgb(26, 11, 230)',
            },
        },

        /* Older browser support */
        noCssanimations: {
            '& slideshow li': {
                opacity: 1,
            },
        },
        fadeIn: {
            zIndex: 1,
            position: 'relative',
            animation: '$fadeIn ease-in 4s',
        },
        '@keyframes fadeIn': {
            '0%': {
                opacity: 0,
            },
            '30%': {
                opacity: 0,
            },
            '80%': {
                opacity: 1,
            },
        },

        // Content
        contentContainer: {
            marginTop: '20px',
            color: 'rgba(255, 255, 255, .87)',
        },
        gridContent: {
            marginTop: '5em',
            // minHeight: '100vh',
        },
        gridContentItem: {
            marginTop: '5em',
            padding: '5em 2em',
            // border: `2px solid ${theme.palette.primary.main}`,
            textAlign: 'center',
            position: 'relative',
            borderStyle: 'solid',
            borderWidth: '0 2px 0 2px',
            borderColor: 'transparent',
            borderRadius: '20px',
            '&:hover': {
                borderStyle: 'solid',
                borderWidth: '0 2px 0 2px',
                borderColor: theme.palette.primary.main,
                borderRadius: '20px',
            },
        },
        button: {
            padding: '.5em 1em',
            borderRadius: '5px',
            borderWidth: `2px`,
            borderStyle: `solid`,
            bottom: '1em',
            position: 'absolute',
            textAlign: 'center',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .06)',
                cursor: 'pointer',
            },
            '&:active': {
                backgroundColor: 'rgba(0, 0, 0, .1)',
                cursor: 'pointer',
            },
        },
        contentTitle: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
        contentItemTitle: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
        contentItemBody: {
            marginBottom: '2em !important',
        },
        // Images
        inlinePhoto: {
            border: '1em solid #fff',
            borderBottom: '4em solid #fff',
            borderRadius: '.25em',
            boxShadow: '1em 1em 2em .25em rgba(0, 0, 0, .2)',
            marginTop: '2em',
            margin: '2em auto 6em auto',
            opacity: 0,
            transform: 'translateY(4em) rotateZ(-5deg)',
            transition: 'transform 4s .25s cubic-bezier(0, 1, .3, 1), opacity .3s .25s ease-out',
            maxWidth: '600px',
            width: '90%',
            willChange: 'transform, opacity',
        },
        isVisible: {
            opacity: '1 !important',
            transform: 'rotateZ(-2deg)',
        },
        // Bottom message
        messageSlide: {
            position: 'relative',
            width: '100%',
            bottom: '60vh',
            '&$in': {
                overflowX: 'visible',
            },
            '&$out': {
                overflowX: 'hidden',
            },
        },
        in: {},
        out: {},
        message: {
            backgroundColor: '#fff',
            boxShadow: '1em 1em 2em .25em rgba(0, 0, 0, .2)',
            padding: '.5em 50px .5em 1em',
            position: 'absolute',
            right: 0,
            opacity: 0,
            visibility: 'hidden',
            transform: 'rotateZ(-5deg) translateX(500px)',
            transition: 'all .5s 1s cubic-bezier(0, 1, .3, 1)',
            width: '400px',
            zIndex: 10,
        },
        messageIsVisible: {
            opacity: 1,
            visibility: 'visible',
            transform: 'rotateZ(5deg) translateX(50px)',
        },
        messageTitle: {
            color: '#545050',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        messageSubtitle: {
            color: '#545050',
            textAlign: 'center',
        },
        messageBody: {
            color: '#545050',
            textAlign: 'center',
        },
    })
);

export { useStyles };
