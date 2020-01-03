import React from 'react';
import Typography from '@material-ui/core/Typography';

export const Preview = ({ _id, number, name, dateFrom, dateTo, description }) => (
    <div key={_id} style={{ color: '#000' }}>
        <Typography variant="h5" component="h3">
            {number} : {name}
        </Typography>
        <Typography component="p">
            {dateFrom.slice(0, 10)} - {dateTo.slice(0, 10)}
        </Typography>
        <Typography component="p">{description}</Typography>
    </div>
);
