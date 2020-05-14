const { ObjectID } = require('mongodb');
const { toMatchMongooseId } = require('./matchers');

describe('matchers', () => {
    describe('toMatchMongooseId', () => {
        test('positive', () => {
            expect(toMatchMongooseId(ObjectID('0123456789ab'), '0123456789ab')).toMatchObject({ pass: true });
        });

        test('negative', () => {
            expect(toMatchMongooseId(ObjectID('0123456789ab'), 'otherId')).toMatchObject({ pass: false });
        });
    });
});
