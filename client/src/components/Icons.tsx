import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRobot,
    // faHatWizard,
    // faGhost,
    // faGamepad,
    // faCat,
    // faBroom,
    faUserSecret,
    faSearchLocation,
} from '@fortawesome/free-solid-svg-icons';

type Size = '1x' | 'xs' | 'lg' | 'sm' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x' | undefined;
interface Props {
    size: Size;
}

export const IconRobot = ({ size }: Props) => (
    <FontAwesomeIcon
        icon={faRobot}
        size="1x"
        // flip="vertical"
        // rotation={90}
        // spin
        // pulse
        // border
        // pull="left"
        // swapOpacity
        // transform="shrink-6 left-4"
        // transform={{ rotate: 42 }}
        // mask={['far', 'circle']}
        // color="#ff0000"
    />
);

export const IconUserSecret = ({ size }: Props) => <FontAwesomeIcon icon={faUserSecret} size={size} />;
export const IconSearch = ({ size }: Props) => <FontAwesomeIcon icon={faSearchLocation} size={size} />;
