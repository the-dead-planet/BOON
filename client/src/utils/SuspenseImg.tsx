import React, { Suspense } from 'react';
import { Img, useImage } from 'react-image';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            overflow: 'hidden',
        },
        img: {
            backgroundColor: theme.palette.background.default,
            objectFit: 'cover',
            height: '100%',
            width: '100%',
            color: 'white',
            borderRadius: '5px',
            transition: 'transform .6s ease-in',
        },
        onHover: {
            '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform .6s ease-out',
            },
        },
        blur: {
            filter: 'blur(25px)',
            overflow: 'hidden',
        },
        blurOff: {
            filter: 'blur(25px)',
            animation: `$no-filter .15s linear forwards`,
            // animation: `$no-filter .15s cubic-bezier(0, 0, .2, 1) forwards`,
        },
        '@keyframes no-filter': {
            '100%': {
                filter: 'none',
            },
        },
    })
);

// Create image component for suspensed image
const ImageComponent = ({ alt, img, className }: { alt: string; img: any; className: any }) => {
    const { src } = useImage({
        srcList: img,
    });

    return <img src={src} alt={alt} className={className} />;
};

interface Props {
    alt: string;
    img: any;
    fallbackImg: any;
    className?: any;
    onHover?: boolean;
}

export const SuspenseImg = ({ alt, img, className, fallbackImg, onHover }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Suspense
                fallback={<Img alt={alt} src={fallbackImg} className={clsx(classes.img, classes.blur, className)} />}
            >
                <ImageComponent
                    alt={alt}
                    img={img}
                    className={clsx(classes.img, classes.blurOff, className, { [classes.onHover]: onHover })}
                />
            </Suspense>
        </div>
    );
};
