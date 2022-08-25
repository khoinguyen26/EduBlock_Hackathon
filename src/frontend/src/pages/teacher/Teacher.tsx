import { useTeacherQuery } from '@fe/hooks/use-query'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const TEXT = {
  TEACHER: 'TEACHER'
}

export function Teacher() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [search, setSearch] = useState('')

  const { queryResult } = useTeacherQuery({
    initialProps: {
      page: page,
      pageSize: pageSize,
    },
  })

  useEffect(() => {
    queryResult.refetch()
  }, [])

  console.log(queryResult.data)

  return (
    <Box>
      <Typography>{TEXT.TEACHER}</Typography>
    </Box>
  )
}
