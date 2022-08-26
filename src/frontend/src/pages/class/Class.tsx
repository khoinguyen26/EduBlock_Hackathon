import { Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const TEXT = {
  CLASS: 'Class',
  CREATE: 'Create'
}

export function Class() {
  return (
    <Box>
      <Typography>{TEXT.CLASS}</Typography>
      <Button
        component={RouterLink}
        to={'/app/class-create'}
        color={'success'}
        variant={'contained'}
        endIcon={<Add />}
      >
        <Typography>{TEXT.CREATE}</Typography>
      </Button>
    </Box>
  )
}
