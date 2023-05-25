import { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const StatusSelect = ({ id, status, onChange }) => {

    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel id={`label-${id}`}>Status</InputLabel>
            <Select
            labelId={`label-${id}`}
            id={`select-${id}`}
            value={status}
            label="status"
            onChange={onChange}
            >
            <MenuItem value={'Paid'}>Paid</MenuItem>
            <MenuItem value={'Completed'}>Completed</MenuItem>
            </Select>
        </FormControl>
    );
};

export default StatusSelect;