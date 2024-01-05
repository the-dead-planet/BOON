// Extend jest with local matchers.
import { toMatchMongooseId } from './src/testing/matchers';

expect.extend({ toMatchMongooseId });
