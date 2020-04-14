import { toBeOfType } from './matchers';

describe('matchers', () => {
    describe('toBeOfType', () => {
        test('positive', () => {
            expect([1, 2, 3]).toBeOfType(Array);
        });

        test('negative', () => {
            expect([1, 2, 3]).not.toBeOfType(String);
        });
    });
});
