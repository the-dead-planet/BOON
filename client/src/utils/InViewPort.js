import React from 'react';
import { useStyles } from '../styles/main';
import handleViewport from 'react-in-viewport';
// TODO: Types mising for react-in-viewport - fix
// // See https://github.com/roderickhsiao/react-in-viewport#readme for more info
// interface Props {
//     inViewport: boolean,
//     // forwardedRef: string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined,
//     forwardedRef: any,
//     enterCount?: number,
//     leaveCount?: number,
//     onEnterViewport?: any,
//     onLeaveViewport?: any,
//     src?: string,
//     variant?: "slideUp" | "slideLeft",
//     children?: React.ReactChild | React.ReactChildren | Array<React.ReactChild>
// }


// This wrapper component injects properties describing if or what should happen if a wrapped component is in viewport
const DivInViewport = ({ forwardedRef, inViewport, children }) => {
    const classes = useStyles();

    return (
        <div ref={forwardedRef} className={`${classes.heading} ${inViewport && classes.headingIsVisible}`} >
            {children}
        </div>
    )
}

const ShowInViewport = handleViewport(DivInViewport)

// This is a special component with classes which set visibility to 'hidden' if image not in viewport, 
// and to 'visible' if in viewport. Those classes use transition effects
const ImageShowOnScroll = ({ inViewport, forwardedRef, src }) => {
    const classes = useStyles();

    return (
        <img ref={forwardedRef} src={src} className={`${classes.inlinePhoto} ${inViewport && classes.isVisible}`} />
    );
};

const ViewportImage = handleViewport(ImageShowOnScroll, /** options: {}, config: {} **/);


// This wrapper is created for bottom message at the bottom of the page
const SlideInViewport = ({ forwardedRef, inViewport, children }) => {
    const classes = useStyles();

    return (
        <div ref={forwardedRef} style={{ position: "relative", width: "100%", bottom: "60vh", overflowX: inViewport ? "visible" : "hidden"}}>
            <div className={`${classes.message} ${inViewport && classes.messageIsVisible}`} >
                {inViewport && children}
            </div>
        </div>
    )
}

const ShowSlideInViewport = handleViewport(SlideInViewport)



export { ShowInViewport, ViewportImage, ShowSlideInViewport }

