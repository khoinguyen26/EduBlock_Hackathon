import { BaseInterface } from '@fe/constants'
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRowsProp,
  GridSortModel
} from '@mui/x-data-grid'

interface TableProps extends BaseInterface {
  columns: GridColDef[]
  rows: GridRowsProp
  rowCount: number
  loading: true | false
  page: { page: number; setPage: (page: number) => void }
  pageSize: { pageSize: number; setPageSize: (size: number) => void }
  sort: { onSortModelChange: (gridSortModel: GridSortModel) => void }
  filter: { onFilterModelChange: (gridFilterModel: GridFilterModel) => void }
}

export function Table(props: TableProps) {
  const {
    columns,
    rows,
    rowCount,
    loading,
    page: { page, setPage },
    pageSize: { pageSize, setPageSize },
    sort: { onSortModelChange },
    filter: { onFilterModelChange }
  } = props
  return (
    <DataGrid
      initialState={{
        pagination: {
          page: page,
          pageSize: pageSize
        }
      }}
      loading={loading}
      columns={columns}
      rows={rows}
      rowCount={rowCount}
      sortingMode={'server'}
      onSortModelChange={onSortModelChange}
      filterMode={'server'}
      onFilterModelChange={onFilterModelChange}
      paginationMode={'server'}
      onPageChange={(page) => setPage(page)}
      onPageSizeChange={(size) => setPageSize(size)}
      editMode={'row'}
      rowSpacingType={'border'}
      rowsPerPageOptions={[5, 10, 20]}
      experimentalFeatures={{ newEditingApi: true }}
    />
  )
}

// DEMO
// import { Table } from '@fe/components'
// import { Stack } from '@mui/material'
// import { GridColDef, GridRowsProp } from '@mui/x-data-grid'

// const columns: GridColDef[] = [
//   {
//     field: 'name',
//     headerName: 'Name',
//     editable: true
//   },
//   {
//     field: 'address',
//     headerName: 'Address',
//     editable: true
//   }
// ]

// // replace Array.from(Array(10)) with data from API, use rowId from API instead of rowIndex
// const rows: GridRowsProp = Array.from(Array(10)).map((_, rowIndex) => ({
//   id: rowIndex,
//   ...columns.reduce((prev, curr) => {
//     return {
//       ...prev,
//       [curr.field]: `${curr.headerName}__${rowIndex}`
//     }
//   }, {})
// }))

// export function Teacher() {
//   return (
//     <Stack height={'100%'}>
//       {/* <Typography>{TEXT.TEACHER}</Typography> */}
//       <Table
//         columns={columns}
//         rows={rows}
//         loading={false}
//         rowCount={rows.length}
//         page={{
//           page: 0,
//           setPage(page) {
//             // set page for query
//           }
//         }}
//         pageSize={{
//           pageSize: 10,
//           setPageSize(size) {
//             // set page size for query
//           }
//         }}
//         sort={{
//           onSortModelChange(gridSortModel) {
//             // set query here
//           }
//         }}
//         filter={{
//           onFilterModelChange(gridFilterModel) {
//             // set query here
//           }
//         }}
//       />
//     </Stack>
//   )
// }
