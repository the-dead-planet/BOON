import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { Field } from 'formik';

const SelectComponent = ({ name, id, label, items }) => {
    // TODO: fix this, posting data not working - 'project' value is not populated correctly
    const [value, setValue] = useState('');

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <Field
            required
            fullWidth
            as={FormControl}
            name={name}
            id={id}
        >
            <InputLabel id={id}>{label}</InputLabel>
            <Select labelId={`${id}-label`} id={`${id}-select`} value={value} onChange={handleChange}>
                {items
                    ? items.map(item => (
                        <MenuItem key={item._id} id={item._id} value={item._id}>
                            {item.title}
                        </MenuItem>
                    ))
                    : null}
            </Select>
        </Field>
    );
};

export default SelectComponent;
