import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import handleViewport from 'react-in-viewport';
import { Children } from '../logic/types';

// TODO: Types mising for react-in-viewport - fix
// // See https://github.com/roderickhsiao/react-in-viewport#readme for more info

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            opacity: 0,
            visibility: 'hidden',
            marginTop: theme.spacing(6),
            transform: 'translateY(0em), opacity .3s .25s ease-out',
        },
        headingIsVisible: {
            opacity: 1,
            visibility: 'visible',
            transform: 'translateY(-4em)',
            transition: 'transform 4s .35s cubic-bezier(0, 1, .3, 1), opacity .3s .25s ease-out',
        },
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
    })
);

interface Props {
    inViewport: boolean;
    // forwardedRef: string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined;
    forwardedRef: any;
    enterCount?: number;
    leaveCount?: number;
    onEnterViewport?: any;
    onLeaveViewport?: any;
    src?: string;
    variant?: 'slideUp' | 'slideLeft';
    children?: Children;
}

// This wrapper component injects properties describing if or what should happen if a wrapped component is in viewport
const DivInViewport = ({ forwardedRef, inViewport, children }: Props) => {
    const classes = useStyles();

    return (
        <div ref={forwardedRef} className={`${classes.heading} ${inViewport && classes.headingIsVisible}`}>
            {children}
        </div>
    );
};

const ShowInViewport = handleViewport(DivInViewport);

// This is a special component with classes which set visibility to 'hidden' if image not in viewport,
// and to 'visible' if in viewport. Those classes use transition effects
const ImageShowOnScroll = ({ inViewport, forwardedRef, src }: Props) => {
    const classes = useStyles();

    return <img ref={forwardedRef} src={src} className={`${classes.inlinePhoto} ${inViewport && classes.isVisible}`} />;
};

const ViewportImage = handleViewport(ImageShowOnScroll /** options: {}, config: {} **/);

// This wrapper is created for bottom message at the bottom of the page
const SlideInViewport = ({ forwardedRef, inViewport, children }: Props) => {
    const classes = useStyles();

    return (
        <div ref={forwardedRef} className={`${classes.messageSlide} ${inViewport ? classes.in : classes.out}`}>
            <div className={`${classes.message} ${inViewport && classes.messageIsVisible}`}>
                {inViewport && children}
            </div>
        </div>
    );
};

const ShowSlideInViewport = handleViewport(SlideInViewport);

export { ShowInViewport, ViewportImage, ShowSlideInViewport };
