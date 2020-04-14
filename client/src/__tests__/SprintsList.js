import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import authService from '../services/authService';
import sprintsService from '../services/sprintsService';

jest.mock('../services/authService');
jest.mock('../services/sprintsService');

describe('app', () => {
    test('Displays a list of sprints', async () => {
        authService.whoami.mockResolvedValue({ user: { username: 'username' } });
        sprintsService.getAll.mockResolvedValue([
            {
                _id: 'sprint0Id',
                number: 0,
                title: 'sprint0Title',
                author: { _id: 'user0Id' },
                likes: [],
                comments: [],
                posts: [],
            },
        ]);

        const { getByText, findByText, findAllByText } = render(<App />);

        const enterButton = await findByText(/enter the boon/i);
        fireEvent.click(enterButton);

        await expect(findAllByText(/sprint0Title/i)).resolves.not.toBeEmpty();
    });
});
