import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Link as RouterLink, Outlet } from 'react-router-dom'
const TEXT = {
  HOME: 'Home',
  HEADER: 'Header',
  FOOTER: 'Footer',
  ROOT: 'Root'
}

export function NormalLayout() {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'grid'}
      gridTemplateAreas={`"header header"
                          "aside main"
                          "aside footer"`}
      gridTemplateRows={'50px auto 50px'}
      gridTemplateColumns={'200px auto'}
      gap={'10px'}
    >
      {/* header (horizontal nav) */}
      <Box
        gridArea={'header'}
        bgcolor={grey[100]}
      >
        <Stack
          direction={'row'}
          width={'100%'}
          height={'100%'}
          alignItems={'center'}
        >
          <Link
            component={RouterLink}
            to={'/'}
          >
            <Typography>{TEXT.ROOT}</Typography>
          </Link>
        </Stack>
      </Box>
      {/* aside (vertical nav) */}
      <Box
        gridArea={'aside'}
        bgcolor={grey[100]}
      >
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'home'}
        >
          <Typography>{TEXT.HOME}</Typography>
        </Button>
      </Box>
      {/* main view */}
      <Box
        gridArea={'main'}
        bgcolor={grey[200]}
      >
        <Outlet />
      </Box>
      {/* footer */}
      <Box
        gridArea={'footer'}
        bgcolor={grey[100]}
      >
        <Typography>{TEXT.FOOTER}</Typography>
      </Box>
    </Box>
  )
}
