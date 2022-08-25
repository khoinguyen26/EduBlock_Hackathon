import { Table } from '@fe/components'
import { useStudentQuery } from '@fe/hooks/use-query'
import { Box, Stack, TextField, Typography } from '@mui/material'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'



const columns: GridColDef[] = [
  {
    field: 'principalId',
    headerName: 'PrincipalId',
    editable: false
  },
  {
    field: 'firstName',
    headerName: 'FirstName',
    editable: false
  },
  {
    field: 'lastName',
    headerName: 'LastName'
  },
  {
    field: 'dob',
    headerName: 'DateOfBirth'
  },
  {
    field: 'address',
    headerName: 'Address'
  },
  {
    field: 'phone',
    headerName: 'Phone'
  },
  {
    field: 'email',
    headerName: 'Email'
  },
  {
    field: 'gender',
    headerName: 'Gender',
  }
]


export function Student() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const { queryResult,

    state: {
      apiData: {
        students: { students },
      },
      queryOptions: {
        search: { setSearch, search }
      } }
  } = useStudentQuery({
    initialProps: {
      page: page,
      pageSize: pageSize,
      search: ''
    },
  })

  const rows: GridRowsProp = students.map((_, rowIndex) => ({
    id: _.id,
    ...columns.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.field]: curr.field == "Gender" ? _.Gender.value : _[curr.field]
      }
    }, {})
  })) || [];


  useEffect(() => {
    queryResult.refetch()
  }, [search])

  return (
    <Stack height={'100%'}>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} padding={1}>
        <TextField
          id="search-teacher"
          variant='outlined'
          label="Teacher Name"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          fullWidth={false}
          sx={{ width: '30%' }} />
      </Stack>
      <Table
        columns={columns}
        rows={rows}
        loading={false}
        rowCount={rows?.length}
        page={{
          page: page,
          setPage(page) {
            setPage(page)
          }
        }}
        pageSize={{
          pageSize: pageSize,
          setPageSize(size) {
            setPageSize(size)
          }
        }}
        sort={{
          onSortModelChange(gridSortModel) {
            // set query here
          }
        }}
        filter={{
          onFilterModelChange(gridFilterModel) {
            // set query here
          }
        }}
      />
    </Stack>
  )
}
