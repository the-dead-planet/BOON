const ModelRoutesDefinition = require('./ModelRoutesDefinition');

const rootDefinition = new ModelRoutesDefinition('Root', { depA: 'DependencyA' });

// NOTE: not used now, but will be useful once recursive logic is implemented
const dependencyADefinition = new ModelRoutesDefinition('DependencyA', { nestedDep: 'DependencyB' });
const dependencyBDefinition = new ModelRoutesDefinition('DependencyB', {});

describe('ModelRoutesDefinition', () => {
    it('populatePaths', () => {
        expect(rootDefinition.populatePaths()).toEqual(['depA']);
    });
});
