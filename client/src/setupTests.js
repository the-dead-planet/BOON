// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import 'intersection-observer';
import mediaQuery from 'css-mediaquery';

// Polyfill mediaquery until jsdom starts supporting it.
// https://material-ui.com/components/use-media-query/#testing
const TEST_SCREEN_WIDTH = 2000;

function createMatchMedia(width) {
    return (query) => ({
        matches: mediaQuery.match(query, { width }),
        addListener: () => {},
        removeListener: () => {},
    });
}

// Mock some browser specific functions.
global.window.scrollTo = () => {};
global.window.matchMedia = createMatchMedia(TEST_SCREEN_WIDTH);

// Extend jest with local matchers.
import { matchers } from './testing/matchers';
expect.extend(matchers);
