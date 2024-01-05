import ModelRegistry from './model-registry';
import ModelRoutesDefinition from './model-routes-definition';
import { SingleModelField, ManyModelField } from './model-field';

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
