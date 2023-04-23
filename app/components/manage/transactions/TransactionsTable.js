import { Table, TableBody, TableCell, 
         TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import StatusSelect from './StatusSelect';

const TransactionsTable = ({ rows, setRows }) => {

    const handleStatusChange = (index) => (event) => {
        // TODO: Backend call
        const updatedRows = rows.map( (row, i) => {
            if (index === i) return { ...rows[index], status: event.target.value }
            else return row;
        });

        setRows(updatedRows);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table" style={{ tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell align="left">Created By</TableCell>
                        <TableCell align="left">Date Created</TableCell>
                        <TableCell align="left">Amount</TableCell>
                        <TableCell align="left">Reference Number</TableCell>
                        <TableCell align="left">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map( (row, index) => {
                        return (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="left">{row.createdBy}</TableCell>
                                <TableCell align="left">{row.dateCreated}</TableCell>
                                <TableCell align="left">{row.amount}</TableCell>
                                <TableCell align="left">{row.referenceNumber}</TableCell>
                                <TableCell align="left">
                                    <StatusSelect id={row.id} status={row.status} onChange={handleStatusChange(index)} />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionsTable;