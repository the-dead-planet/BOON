import { pathsInMongooseFormat } from './queries';

describe('pathsInMongooseFormat', () => {
    it('empty', () => {
        expect(pathsInMongooseFormat({})).toEqual([]);
    });

    it('single', () => {
        expect(pathsInMongooseFormat({ dependency: {} })).toEqual([{ path: 'dependency', populate: [] }]);
    });

    it('nested', () => {
        expect(pathsInMongooseFormat({ firstDependency: { nestedDependency: {} } })).toEqual([
            { path: 'firstDependency', populate: [{ path: 'nestedDependency', populate: [] }] },
        ]);
    });
});
