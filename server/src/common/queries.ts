// The type used to define nested dependencies in this project.
// Different than the structure used by mongoose.
type NestedDependency = { [key: string]: NestedDependency };

type MongooseDependency = { path: string; populate: Array<MongooseDependency> };

export const pathsInMongooseFormat = (paths: NestedDependency): Array<MongooseDependency> => {
    return Object.keys(paths).map(path => {
        const dependencies = paths[path];
        return {
            path,
            populate: pathsInMongooseFormat(dependencies),
        };
    });
};
