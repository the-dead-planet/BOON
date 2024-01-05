const ModelRegistry = require('./model-registry');
const ModelRoutesDefinition = require('./model-routes-definition');
const { SingleModelField, ManyModelField } = require('./model-field');

const root = new ModelRoutesDefinition({ depA: new SingleModelField('intermediate') });
const intermediate = new ModelRoutesDefinition({ nestedDep: new ManyModelField('leaf') });
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
