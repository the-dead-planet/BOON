// Converts a raw request into a structured object.
// `mappers` is an object storing functions generating outputs for each field.

import { Request } from "express";

export type Mappers = {
    [key in string]: (req: Request) => unknown;
};

export type RequestMappers = {
    [key in RequestMethod]?: Mappers;
}
// Returns an object composed of `request.body` and individual results of each mapper.
export const requestPreprocessor = (mappers: Mappers) => (request: Request) => {
    const mappedProps = Object.fromEntries(Object.keys(mappers).map((key) => [key, mappers[key as RequestMethod](request)]));

    // If a field appears both in `body` and `mappers`, the value from `mappedProps` will take precedence.
    return {
        ...request.body,
        ...mappedProps,
    };
};

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}
