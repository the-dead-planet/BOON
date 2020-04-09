import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import sprintsService from '../services/sprintsService';
import StateData from '../logic/StateData';
import { setNestedObjectValues } from 'formik';

// TODO: czy tu po prostu nie pobrac sobie pierwszego lepszego z bazy uzywajac sprintsService?
const sampleComment = {
    likes: [
        {
            type: 'Excited',
            _id: '5e7f6aff6035d12174842d3a',
            author: {
                active: true,
                skills: ['C++', 'Python', 'IT Security'],
                _id: '5e7f6afe6035d12174842b90',
                username: 'encyclopaedia@encyclopaedia.com',
                publicName: 'encycLopaedia',
                role: 'Back-end Developer',
                country: 'DE',
                created: '2020-03-28T15:19:26.952Z',
                __v: 0,
            },
            created: '2020-03-28T15:19:27.748Z',
            __v: 0,
        },
        {
            type: 'Excited',
            _id: '5e7f6aff6035d12174842d38',
            author: {
                active: true,
                skills: ['Scrum', 'Agile', 'Business Analysis'],
                _id: '5e7f6afe6035d12174842b8b',
                username: 'admin@admin.com',
                publicName: 'admin',
                role: 'Scrum Master',
                country: 'NL',
                created: '2020-03-28T15:19:26.951Z',
                __v: 0,
            },
            created: '2020-03-28T15:19:27.748Z',
            __v: 0,
        },
    ],
    _id: '5e7f6aff6035d12174842bc5',
    body:
        'Finite but unbounded tesseract muse about the ash of stellar alchemy astonishment kindling the energy hidden in matter.',
    author: {
        active: true,
        skills: ['python', 'R', 'Statistics'],
        _id: '5e7f6afe6035d12174842b8d',
        username: 'nemo@nemo.com',
        publicName: 'nemo',
        role: 'Data Engineer',
        country: 'FR',
        created: '2020-03-28T15:19:26.951Z',
        __v: 0,
    },
    created: '2020-03-28T15:19:27.403Z',
    __v: 1,
};

const mockResult = {
    likes: ['5e7f6aff6035d12174842d3a', '5e7f6aff6035d12174842d38'],
    _id: '5e7f6aff6035d12174842bc5',
    body:
        'Finite but unbounded tesseract muse about the ash of stellar alchemy astonishment kindling the energy hidden in matter.',
    author: '5e7f6afe6035d12174842b8d',
    created: '2020-03-28T15:19:27.403Z',
    __v: 1,
};

jest.mock('../logic/StateData');
// jest.mock('../services/sprintsService');

// setAndDepopulateOne - return: _id - also state needs to include all objects extracted from the object passed as parameter
// setAndDepopulateMany - return: [_id, ...]
// depopulate - return { _id: ... , comments: Array typeof String} / expect all properties to not be setNestedObjectValues, either string or array of strings

describe('app', () => {
    test('Depopulates an object and outputs its _id and initiates the same for every depopulated object', () => {
        let state = { sprints: new Map(), posts: new Map(), comments: new Map(), likes: new Map(), users: new Map() };
        StateData.setAndDepopulateOne(sampleComment, ['author', 'likes'], state);
        // check state result too - test for scenario where method returns _id but is not depopulating nested objects and not adding them to state

        // authService.whoami.mockResolvedValue({ user: { username: 'username' } });
        // sprintsService.getAll.mockResolvedValue([
        //     { _id: 'sprint0Id', number: 0, title: 'sprint0Title', author: { _id: 'user0Id' }, likes: [], comments: [] },
        // ]);

        // const { getByText, findByText, findAllByText } = render(<App />);

        // const enterButton = await findByText(/enter the boon/i);
        // fireEvent.click(enterButton);

        // await expect(findAllByText(/sprint0Title/i)).resolves.not.toBeEmpty();
    });
});
