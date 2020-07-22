import React from 'react';

/* 
    Below methods inject properties 'error' and 'touched' to Field components provided to the AppForm as children.
    Validation takes place at the parent 'Formik' component in AppForm and fields are provided as children.
    The methods are applied as we want to inject only one relevant 'error' and 'touched' value to each field, instead of the whole objects.
*/

// Return a value for 'name' only if object keys include 'name'
const getValue = (obj: object, name: string) => {
    for (const [key, value] of Object.entries(obj || {})) {
        if (key === name) {
            return value;
        }
    }
}

// Injects 'error' and 'touched' prop to a single child component
export const withValidation = (child: React.ReactElement, errors: object, touched: object, i: number) =>
    React.cloneElement(child, {
        key: i,
        error: getValue(errors, child.props.name),
        touched: getValue(touched, child.props.name),
    })

// Injects 'error' and 'touched' prop to a group of component
export const withValidationList = (children: Array<React.ReactElement>, errors: object, touched: object) =>
    [children].flat().map((child, i) =>
        child && withValidation(child, errors, touched, i)
    )