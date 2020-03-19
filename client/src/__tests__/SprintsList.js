import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import authService, { resolveWhoAmi } from '../services/authService';
import MockSprintsService from '../services/sprintsService';

jest.mock('../services/authService');
jest.mock('../services/sprintsService');

describe('app', () => {
    test('Displays a list of sprints', async () => {
        const { getByText, findByText, findAllByText } = render(<App />);

        // Resolve all requests upfront to make the test simpler.
        resolveWhoAmi({ user: { username: 'username' } });
        MockSprintsService.getAll.mockResolvedValue([
            { _id: 'sprint0Id', number: 0, title: 'sprint0Title', author: { _id: 'user0Id' }, likes: [], comments: [] },
        ]);

        const enterButton = await findByText(/enter the boon/i);
        fireEvent.click(enterButton);

        await expect(findAllByText(/sprint0Title/i)).resolves.not.toBeEmpty();
    });
});
