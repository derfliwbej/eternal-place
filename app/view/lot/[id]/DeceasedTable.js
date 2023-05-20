import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'first_name', headerName: 'First Name', flex: 1, editable: false },
    { field: 'middle_name', headerName: 'Middle Name', flex: 1, editable: false },
    { field: 'last_name', headerName: 'Last Name', flex: 1, editable: false },
    { field: 'born_date', headerName: 'Birth Date', flex: 1, editable: false },
    { field: 'death_date', headerName: 'Death Date', flex: 1, editable: false }
];

const DeceasedTable = ({ rows }) => {
    return (
        <DataGrid rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 }
                    }
                  }}
                  pageSizeOptions={[5, 10, 15, 20]}
        />
    )
};

export default DeceasedTable;