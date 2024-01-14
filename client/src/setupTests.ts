// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import 'intersection-observer';
import mediaQuery from 'css-mediaquery';
import { matchers } from './testing/matchers';

// Polyfill mediaquery until jsdom starts supporting it.
// https://material-ui.com/components/use-media-query/#testing
const TEST_SCREEN_WIDTH = 2000;

function createMatchMedia(width: number) {
    return (query: string): MediaQueryList => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
        media: '',
        onchange: () => null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true
    });
}

// Mock some browser specific functions.
global.window.scrollTo = () => {};
global.window.matchMedia = createMatchMedia(TEST_SCREEN_WIDTH);

// Extend jest with local matchers.
expect.extend(matchers);
