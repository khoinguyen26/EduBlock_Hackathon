import { Box, Typography } from '@mui/material'

const TEXT = {
  TEACHER_PENDING: 'Teacher Pending'
}

export function TeacherPending() {
  return (
    <Box>
      <Typography>{TEXT.TEACHER_PENDING}</Typography>
    </Box>
  )
}
