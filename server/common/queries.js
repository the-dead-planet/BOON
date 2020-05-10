const pathsInMongooseFormat = paths => {
    return Object.keys(paths).map(path => {
        const dependencies = paths[path];
        return {
            path,
            populate: pathsInMongooseFormat(dependencies),
        };
    });
};

module.exports = { pathsInMongooseFormat };
