import { requestPreprocessor } from './request';

describe('requestPreprocessor', () => {
    const request = { user: 'user', body: { a: 'A', b: 'B' } };

    it('no mappers', () => {
        expect(requestPreprocessor({})(request)).toEqual({ a: 'A', b: 'B' });
    });

    it('mapper adding a new property', () => {
        const addAB = req => req.body.a + req.body.b;
        const mappers = { c: addAB };
        expect(requestPreprocessor(mappers)(request)).toEqual({ a: 'A', b: 'B', c: 'AB' });
    });

    it('mapper overwriting an existing property', () => {
        const addAB = req => req.body.a + req.body.b;
        const mappers = { b: addAB };
        expect(requestPreprocessor(mappers)(request)).toEqual({ a: 'A', b: 'AB' });
    });
});
