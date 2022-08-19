import { Button, Pagination, Paper, Stack, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#A8A6FE',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function StudentTable(props: any) {
    const { data } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // console.log(data.data?.results);

    return (
        <Paper style={{ marginTop: '1%' }}>
            <TableContainer>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Họ</StyledTableCell>
                            <StyledTableCell>Tên</StyledTableCell>
                            <StyledTableCell>Ngày sinh</StyledTableCell>
                            <StyledTableCell>Giới tính</StyledTableCell>
                            <StyledTableCell>Số điện thoại</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Địa chỉ</StyledTableCell>
                            <StyledTableCell>Principal ID</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data?.results?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                            return (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.FirstName}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.LastName}</StyledTableCell>
                                    <StyledTableCell>{row.DateOfBirth}</StyledTableCell>
                                    <StyledTableCell>{row.Gender.value}</StyledTableCell>
                                    <StyledTableCell>{row.Phone}</StyledTableCell>
                                    <StyledTableCell>{row.Email}</StyledTableCell>
                                    <StyledTableCell>{row.Address}</StyledTableCell>
                                    <StyledTableCell>{row.PrincipalId}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button>
                                            <EditOutlinedIcon />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.data?.results?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}