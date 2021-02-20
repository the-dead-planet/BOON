import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import services from '../services/realImpl';

jest.mock('../services/realImpl');

// TODO: This test is temporarily failing due to the deletion of the "sprints contents list" component
// The component will be added back again once the designer finds inspiration to find an appropriate place for it.
describe('app', () => {
    test('Displays a list of sprints', async () => {
        const { authService, projectsService, usersService, sprintsService } = services;

        // Data from those services is not required for the test to pass.
        // Provide a trivial implementation.
        projectsService.getAll.mockResolvedValue([]);
        usersService.getAll.mockResolvedValue([]);

        authService.whoami.mockResolvedValue({ user: { username: 'username' } });
        sprintsService.getAll.mockResolvedValue([
            {
                _id: 'sprint0Id',
                number: 0,
                title: 'sprint0Title',
                body: 'sprint0Body',
                author: { _id: 'user0Id' },
                likes: [],
                comments: [],
                posts: [],
            },
        ]);

        const { findAllByText } = render(<App />);

        await expect(findAllByText(/sprint0Title/i)).resolves.not.toBeEmpty();
    });
});
