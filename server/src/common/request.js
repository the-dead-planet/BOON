// Converts a raw request into a structured object.
// `mappers` is an object storing functions generating outputs for each field.
// Returns an object composed of `request.body` and individual results of each mapper.
const requestPreprocessor = mappers => request => {
    const mappedProps = Object.fromEntries(Object.keys(mappers).map(key => [key, mappers[key](request)]));

    // If a field appears both in `body` and `mappers`, the value from `mappedProps` will take precedence.
    return {
        ...request.body,
        ...mappedProps,
    };
};

const RequestMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

module.exports = { requestPreprocessor, RequestMethod };
