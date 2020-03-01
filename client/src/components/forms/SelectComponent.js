import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const SelectComponent = ({ field, i }) => {
    // TODO: fix this, posting data not working - 'project' value is not populated correctly
    const [value, setValue] = useState('');

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        // <Field required fullWidth as={field.component} name={field.name} id={field.id}>
        <React.Fragment>
            <InputLabel id={`label-${i}`}>{field.label}</InputLabel>
            <Select labelId="add-post-project-select" id={`select-label-${i}`} value={value} onChange={handleChange}>
                {field.select.list
                    ? field.select.list.map(item => (
                          <MenuItem key={item._id} id={item._id} value={item._id}>
                              {item.title}
                          </MenuItem>
                      ))
                    : null}
            </Select>
        </React.Fragment>
        // </Field>
    );
};

export default SelectComponent;
