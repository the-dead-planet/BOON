import { concatMaps } from './containers';
import { buildMap } from '../testing/builders';

describe('concatMaps', () => {
    // A pair of items is the simplest, non-trivial case.
    // Extract is to a separate block.
    describe('pair', () => {
        test('empty', () => {
            expect(concatMaps([new Map(), new Map()])).toEqual(new Map());
        });

        test('disjoint', () => {
            expect(concatMaps([buildMap({ a: 1 }), buildMap({ b: 2 })])).toEqual(buildMap({ a: 1, b: 2 }));
        });

        test('overlapping', () => {
            expect(concatMaps([buildMap({ a: 1 }), buildMap({ a: 2 })])).toEqual(buildMap({ a: 2 }));
        });
    });

    test('empty', () => {
        expect(concatMaps([])).toEqual(new Map());
    });
});
