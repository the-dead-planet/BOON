/* 
    The purpose of this file is to store classes which could be used in the application.

    Global changes on Material UI components should be done by overwriting the default MIU classes 
    -> see folder src/components/mui-styled

    Additional classes should be applied inside the component files.

    Do not reference classes from this file. This solution was leading to issues.
    For example, some styles were ignored or required the '!important' suffix.
    These issues do not occur if classes are applied as explained above.
*/
import { makeStyles, createStyles } from '@mui/styles';

const header = require('../img/landing/header-1.jpg');
const header2 = require('../img/landing/header-2.jpg');

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
        headerSimple: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1em',
            backgroundColor: '#333',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            perspective: '100px',
            position: 'relative',
            textAlign: 'center',
            color: 'white',
            transformStyle: 'preserve-3d',
            '&::before': {
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8)), 
                        url(${header}) no-repeat bottom`,
                backgroundSize: 'cover',
                content: "''",
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: -1,
                opacity: 0,
                transform: 'translateY(-4rem)', // the same effect if initialized like this and animated using the 'no-transform'
                // animation: name duration delay? easing
                // animation: `$fade-slide-down 2000ms ease-out forwards`,
                // animation: `$fade-slide-down 2000ms ${theme.transitions.easing.easeOut} forwards`,
                animation: `$no-transform 2s .5s cubic-bezier(0, .5, 0, 1) forwards`,
            },
            '&::after': {
                backgroundColor: '#F9FCFF',
                content: "''",
                height: '40rem',
                left: '-5%',
                position: 'absolute',
                right: '-5%',
                top: '90%',
                transformOrigin: '0 0',
                // transform: "rotateZ(-4deg)", // animation handles rotation
                zIndex: -1,
                animation: `$rotate-up .5s .5s cubic-bezier(0, .5, 0, 1) forwards`,
            },
        },
        // '@keyframes fade-slide-down': {
        //     '0%': {
        //         opacity: 0,
        //         transform: "translateY(-4rem)",
        //     },
        //     '100%': {
        //         opacity: 1,
        //         transform: "none",
        //     },
        // },
        '@keyframes rotate-up': {
            '100%': {
                transform: 'rotateZ(-4deg)',
            },
        },
        popIn: {
            // animation: "$pop-in .6s cubic-bezier(0, .9, .3, 1.2) forwards",
            animation: '$no-transform .6s cubic-bezier(0, .9, .3, 1.2) forwards',
            opacity: 0,
            transform: 'translateY(-4rem) scale(.8)',
        },
        fadeIn: {
            animation: '$no-transform 1s ease-in forwards',
            opacity: 0,
        },
        // '@keyframes pop-in': {
        //     '0%': {
        //         opacity: 0,
        //         transform: "translateY(-4rem) scale(.8)",
        //     },
        //     '100%': {
        //         opacity: 1,
        //         transform: "none",
        //     },
        // },
        headerSimpleLightning: {
            animationDelay: '.6s !important',
        },
        headerSimpleTitle: {
            animationDelay: '.8s !important',
        },
        headerSimpleSubtitle: {
            animationDelay: '1s !important',
        },
        headerSimpleButton: {
            animationDelay: '1.1s',
        },
        // '@keyframes fade-slide-up': {    // Removed thanks to the no-transform and moving transform prop to the class
        //     '0%': {
        //         opacity: 0,
        //     },
        //     '100%': {
        //         opacity: 1,
        //         transform: "none",
        //     },
        // },
        // TODO refactor and remove redundancy
        headerFrame: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#333',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            perspective: '100px',
            position: 'relative',
            textAlign: 'center',
            color: 'white',
            textTransform: 'uppercase',
            transformStyle: 'preserve-3d',
            '&::before': {
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8)), 
                        url(${header2}) no-repeat top`,
                backgroundSize: 'cover',
                content: "''",
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: -1,
                // opacity: 0,
                animation: `$scale-up 20s ease-in-out`,
            },
            '&::after': {
                // backgroundColor: "#F9FCFF",
                content: "''",
                position: 'absolute',
                top: '-15px',
                bottom: '-15px',
                height: 'auto',
                width: 'auto',
                left: '-15px',
                right: '-15px',
                backgroundColor: 'transparent',
                border: '15px solid #F9FCFF',
                transformOrigin: '0 0',
                // transform: "rotateZ(-4deg)", // animation handles rotation
                zIndex: -1,
                animation: `$frame-in 1s 1s ease-out forwards`,
            },
        },
        headerFrameInner: {
            position: 'absolute',
            width: 'auto',
            height: 'auto',
            left: '15%',
            right: '15%',
            top: '10vh',
            bottom: '10vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerFrameTitle: {
            animationDelay: '.2s !important',
        },
        headerFrameSubtitle: {
            animationDelay: '1.2s !important',
        },
        headerFrameButton: {
            animationDelay: '2.4s !important',
            '&:hover': {
                backgroundColor: '#F9FCFF',
                color: 'rgba(0, 0, 0, 0.8)',
                padding: '0 .2em',
            },
        },
        '@keyframes frame-in': {
            '100%': {
                left: '30px',
                right: '30px',
                top: '30px',
                bottom: '30px',
            },
        },
        '@keyframes scale-up': {
            '100%': {
                transform: 'scale(1.4)',
            },
        },

        // Hover effects - use two colons for future compatibility
        linkUnderline: {
            position: 'relative',
            color: `${theme.palette.secondary.dark}`,
            transition: 'color .4s ease-out',
            fontWeight: 'bold',
            '&::after': {
                content: "''",
                borderRadius: '1em',
                borderTop: `.1em solid ${theme.palette.secondary.dark}`,
                position: 'absolute',
                right: '100%',
                bottom: '0em',
                left: 0,
                transition: 'right .4s cubic-bezier(0, .5, 0, 1), border-color .4s ease-out',
            },
            '&:hover': {
                color: theme.palette.secondary.main,
            },
            '&:hover::after': {
                borderColor: theme.palette.secondary.main,
                right: 0,
            },
        },

        linkUnderlineAnim: {
            position: 'relative',
            color: `${theme.palette.secondary.dark}`,
            transition: 'color .4s ease-out',
            fontWeight: 'bold',
            '&::after': {
                content: "''",
                borderRadius: '1em',
                borderTop: `.1em solid ${theme.palette.secondary.dark}`,
                position: 'absolute',
                right: '100%',
                bottom: '0em',
                left: 0,
                transition: 'right .4s cubic-bezier(0, .5, 0, 1), border-color .4s ease-out',
            },
            '&:hover': {
                color: theme.palette.secondary.main,
            },
            '&:hover::after': {
                borderColor: theme.palette.secondary.main,
                animation: '$anchor-underline 2s cubic-bezier(0, .5, 0, 1) infinite',
            },
        },
        '@keyframes anchor-underline': {
            '0%, 10%': {
                left: '0%',
                right: '100%',
            },
            '40%, 60%': {
                left: '0%',
                right: '0%',
            },
            '90%, 100%': {
                left: '100%',
                right: '0%',
            },
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, .0)',
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: '.1em',
            fontSize: '.7em',
            opacity: 0,
            visibility: 'hidden',
            padding: '.25em .5em',
            position: 'absolute',
            bottom: '1.75em',
            left: 'calc(50% - 8em)',
            textAlign: 'center',
            transform: 'translateY(-.25em)',
            transition: 'visibility 0s .5s, opacity .2s ease-out, transform .5s cubic-bezier(0, 1, .5, 1)',
            width: '16em',
            zIndex: 10,
            '&::after': {
                content: "''",
                borderStyle: 'solid',
                borderColor: `${theme.palette.secondary.main} transparent`,
                borderRadius: 0,
                borderWidth: '.2em .2em 0 .2em',
                position: 'absolute',
                bottom: '-.2em',
                left: 'calc(50% - .2em)',
                width: 0,
            },
            '&:hover': {
                opacity: 1,
                visibility: 'visible',
                transform: 'none',
                transition: 'opacity .2s ease-out, transform .2s cubic-bezier(0, 1, .5, 1)',
            },
        },

        // Option tiles
        option: {
            textAlign: 'center',
        },
        moreInfo: {
            visibility: 'hidden',
            opacity: 0,
            // transform: "visibility 0s .5s, translateY(-4em)",
        },
        highlighted: {
            background: '#fff',
            borderColor: theme.palette.secondary.main,
            transform: 'scale(1.2) translateY(1em)',
            visibility: 'visible',
        },
        badge: {
            transform: 'translateY(-5em) scale(1.2)',
        },
        optionTitle: {
            transform: 'translateY(-3em)',
        },
        callToAction: {
            transform: 'translateY(1.25em)',
            visibility: 'visible',
        },
        //
        linkSwipeDown: {
            color: 'transparent',
            fontWeight: 'bold',
            display: 'inline-block',
            position: 'relative',
            // margin: "0 .2em",
            textDecoration: 'none',
            transformStyle: 'preserve-3d',
            perspective: '800px',
            '&::before': {
                bottom: 0,
                color: theme.palette.secondary.dark,
                content: 'attr(placeholder)',
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                transition: 'opacity .2s ease-out, transform .4s cubic-bezier(.2,1.5,1,1)',
            },
            '&::after': {
                bottom: 0,
                color: theme.palette.secondary.main,
                content: 'attr(placeholder)',
                left: 0,
                opacity: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                transform: 'translateY(-.6em) rotateX(90deg)',
                transition: 'transform .4s cubic-bezier(.2,1.5,1,1), opacity .2s ease-out',
            },
            '&:hover::before': {
                opacity: 0,
                transform: 'translateY(.6em) rotateX(-90deg)',
                transition: 'opacity .2s ease-out, transform .4s cubic-bezier(.2,1.5,1,1)',
            },
            '&:hover::after': {
                opacity: 1,
                transform: 'none',
                transition: 'opacity .2s ease-out, transform .4s cubic-bezier(.2,1.5,1,1)',
            },
        },

        // Must be last, sequence impacts importance.
        show: {
            opacity: 1,
            transform: 'none',
            visibility: 'visible',
            transition: 'opacity .2s ease-out, transform .5s cubic-bezier(0, 1, .5, 1)',
        },

        // Styled tooltip
        styledTooltip: {
            color: theme.palette.secondary.dark,
            fontWeight: 'bold',
            '&:hover': {
                position: 'relative',
            },
            // "&[title]:hover:after": { // TODO: default tooltip does not disappear with this solution
            '&:hover:after': {
                content: 'attr(placeholder)',
                color: theme.palette.secondary.main,
                fontWeight: '400',
                fontSize: '.5em',
                backgroundColor: 'white',
                padding: '4px 8px',
                position: 'absolute',
                left: 0,
                top: '100%',
                // height: "50px",
                whiteSpace: 'nowrap',
                zIndex: 20,
                borderRadius: '5px',
                boxShadow: `0px 0px 4px ${theme.palette.secondary.main}`,
            },
        },

        // Button
        decoratedButton: {
            // margin: "1em",
            background: 'none',
            textDecoration: 'none',
            position: 'relative',
            padding: '1em',
            transition: 'all .5s cubic-bezier(0, 1, .3, 1)',
            '&::before': {
                content: "''",
                background: 'rgba(200, 200, 200, 0.8)',
                borderRadius: '.25em',
                position: 'absolute',
                top: '5em',
                right: '.1em',
                bottom: '-.1em',
                left: '.1em',
                zIndex: -1,
                transition: 'all .5s cubic-bezier(0, 1, .3, 1)',
            },
            '&::after': {
                backgroundColor: '#1A9E3F',
                borderRadius: '.25em',
                content: "''",
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: -1,
                transition: 'all .5s cubic-bezier(0, 1, .3, 1)',
            },
            '&:hover': {
                textDecoration: 'none',
                transform: 'scale(1.1)',
            },
            '&:hover::before': {
                transform: 'translateY(.1em)',
            },
            '&:hover::after': {
                backgroundColor: '#28B54F',
            },
            '&:active': {
                transform: 'translateY(.2em)',
            },
            '&:active:before': {
                transform: 'translateY(-.1em)',
                transition: 'none',
            },
        },

        // Glitch
        glitch: {
            color: 'black',
            fontSize: '100px',
            position: 'relative',
            width: '400px',
            margin: '0 auto',
            '&::before': {
                content: 'attr(data-text)',
                position: 'absolute',
                left: '-2px',
                textShadow: '1px 0 blue',
                top: 0,
                color: 'black',
                background: 'white',
                overflow: 'hidden',
                clip: 'rect(0,900px,0,0)',
                animation: 'noise-anim-2 3s infinite linear alternate-reverse',
            },
            '&::after': {
                content: 'attr(data-text)',
                position: 'absolute',
                left: '2px',
                textShadow: '-1px 0 red',
                top: 0,
                color: 'black',
                background: 'white',
                overflow: 'hidden',
                clip: 'rect(0,900px,0,0)',
                animation: 'noise-anim 2s infinite linear alternate-reverse',
            },
        },
        '@keyframes noise-anim': {
            $steps: 20,
            '@for $i from 0 through $steps': {
                '#{percentage($i*(1/$steps))}': {
                    clip: 'rect(random(100)+px,9999px,random(100)+px,0)',
                },
            },
        },
        '@keyframes noise-anim-2': {
            $steps: 20,
            '@for $i from 0 through $steps': {
                '#{percentage($i*(1/$steps))}': {
                    clip: 'rect(random(100)+px,9999px,random(100)+px,0)',
                },
            },
        },

        // Show on scroll
        showOnScroll: {
            opacity: 0,
        },
        // Heading
    })
);

export { useStyles };
