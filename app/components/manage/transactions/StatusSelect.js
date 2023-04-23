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
            <MenuItem value={0}>For Payment</MenuItem>
            <MenuItem value={1}>Paid</MenuItem>
            <MenuItem value={2}>Completed</MenuItem>
            </Select>
        </FormControl>
    );
};

export default StatusSelect;