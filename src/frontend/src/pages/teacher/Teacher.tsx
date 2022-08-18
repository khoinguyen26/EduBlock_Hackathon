import TeacherSearch from '@fe/components/teacher/TeacherSearch'
import TeacherTable from '@fe/components/teacher/TeacherTable'
import useList from '@fe/hooks/use-query/use-teacher/useList'
import useSearch from '@fe/hooks/use-query/use-teacher/useSearch';
import { Box, Typography } from '@mui/material'

// const TEXT = {
//   TEACHER: 'TEACHER'
// }

export function Teacher() {
  const {
    searchTeachersQuery,
    state: {
      search: { searchKey, setSearchKey }
    }
  } = useSearch();
  const _ = useList();


  return (
    <Box padding={1}>
      <TeacherSearch />
      <TeacherTable data={searchTeachersQuery} />
    </Box>
  )
}
