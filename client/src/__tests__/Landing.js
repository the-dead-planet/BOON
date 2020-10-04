import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import authService from '../services/authService';

jest.mock('../services/authService');

describe('landing page', () => {
    test('Waits from whoami and renders some content', () => {
        let resolveHandle;
        authService.whoami.mockImplementation(
            () =>
                new Promise((resolve) => {
                    resolveHandle = resolve;
                })
        );

        const { getByText, findAllByText } = render(<App />);

        // The whoami request is pending - app shows a loading screen.
        expect(getByText(/loading/i)).toBeInTheDocument();

        // Finalize the request. The app should transition to the landing page.
        // Check that at least one item with the work "boon" is rendered in the document.
        resolveHandle({ user: null });
        const boonItemsPromise = findAllByText(/boon/i);
        return expect(boonItemsPromise).resolves.not.toBeEmpty();
    });
});
