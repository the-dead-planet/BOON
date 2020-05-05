const ModelRegistry = require('./ModelRegistry');
const ModelRoutesDefinition = require('./ModelRoutesDefinition');

const root = new ModelRoutesDefinition({ depA: 'intermediate' });
const intermediate = new ModelRoutesDefinition({ nestedDep: 'leaf' });
const leaf = new ModelRoutesDefinition({});

const modelRegistry = new ModelRegistry({ root, intermediate, leaf });

describe('ModelRoutesDefinition', () => {
    describe('populatePaths', () => {
        it('no dependencies', () => {
            expect(modelRegistry.populatePaths('leaf')).toEqual({});
        });

        it('nested dependencies', () => {
            expect(modelRegistry.populatePaths('root')).toEqual({ depA: { nestedDep: {} } });
        });
    });
});
