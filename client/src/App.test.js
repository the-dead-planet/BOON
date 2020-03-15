import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import authService, { resolveWhoAmi, rejectWhoAmi } from './services/authService';
import * as MockSprintsService from './services/sprintsService';

jest.mock('./services/authService');
jest.mock('./services/sprintsService');

describe('landing page', () => {
    test('Waits from whoami and renders an enter button', () => {
        const { getByText, findByText } = render(<App />);

        // The whoami request is pending - app shows a loading screen.
        expect(getByText(/loading/i)).toBeInTheDocument();

        // Finalize the request. The app should transition to the landing page.
        resolveWhoAmi({ user: { username: 'username' } });
        const enterButtonPromise = findByText(/enter the boon/i);
        return expect(enterButtonPromise).resolves.toBeInTheDocument();
    });
});

describe('app', () => {
    test('Displays a list of sprints', async () => {
        const { getByText, findByText, findAllByText } = render(<App />);

        // Resolve all requests upfront to make the test simpler.
        resolveWhoAmi({ user: { username: 'username' } });
        MockSprintsService.resolveGetAll([
            { _id: 'sprint0Id', number: 0, title: 'sprint0Title', author: { _id: 'user0Id' }, likes: [], comments: [] },
        ]);

        await fireEvent.click(await findByText(/enter the boon/i));
        await expect(findAllByText(/sprint0Title/i)).resolves.not.toBeEmpty();
    });
});
