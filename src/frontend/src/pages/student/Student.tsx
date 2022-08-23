import TableComponent from '@fe/components/table/TableComponent';
import useStudent from '@fe/hooks/use-query/use-student/useStudent';
import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


export function Student() {

  const {
    searchTeachersQuery,
    fetchData,
    state: {
      search: { searchKey, setSearchKey, page, setPage, rowsPerPage, setRowsPerPage },
    }
  } = useStudent();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // console.log(searchTeachersQuery.data?.data?.results.map((option) => {label: option.FirstName + ' ' + option.LastName} ));
  console.log(searchTeachersQuery);
  if (searchTeachersQuery.isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )

  }

  return (
    <Box>
      <form onSubmit={fetchData}>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <TextField
            id="search-teacher"
            variant='outlined'
            label="Teacher Name"
            value={searchKey}
            onChange={(e) => { setSearchKey(e.target.value); setPage(0) }}
            fullWidth={false}
            sx={{ width: 300 }} />

          <Button variant="contained" sx={{ width: 150, justifyContent: "space-between" }} endIcon={<SearchIcon />} type="submit">Search</Button>
        </Stack>
      </form>
      <TableComponent data={searchTeachersQuery}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage} />
    </Box>
  )
}
