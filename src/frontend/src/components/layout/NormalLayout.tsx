import { useConnect } from '@connect2ic/react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Link as RouterLink, Outlet } from 'react-router-dom'
import { Header } from './components'

const TEXT = {
  HOME: 'Home',
  HEADER: 'Header',
  FOOTER: 'Footer',
  ROOT: 'Root',
  LOGIN: 'Login',
  SCHOOL_REPORT: 'School Report',
  APP: 'App',
  TEACHER: 'Teacher',
  TEACHER_PENDING: 'Teacher Pending',
  CLASS: 'Class',
  CLASS_CREATE: 'Class Create',
  CLASS_UPDATE: 'Class Update',
  STUDENT: 'Student'
}

export function NormalLayout() {
  const { principal } = useConnect()
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'grid'}
      gridTemplateAreas={`"aside header"
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
        <Header />
      </Box>
      {/* aside (vertical nav) */}
      <Box
        gridArea={'aside'}
        bgcolor={grey[100]}
      >
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/'}
        >
          <Typography>{TEXT.HOME}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/app'}
        >
          <Typography>{TEXT.APP}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/login'}
        >
          <Typography>{TEXT.LOGIN}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/school-report'}
        >
          <Typography>{TEXT.SCHOOL_REPORT}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/app/teacher'}
        >
          <Typography>{TEXT.TEACHER}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/app/teacher-pending'}
        >
          <Typography>{TEXT.TEACHER_PENDING}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/app/class'}
        >
          <Typography>{TEXT.CLASS}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/app/class-create'}
        >
          <Typography>{TEXT.CLASS_CREATE}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/app/class-update'}
        >
          <Typography>{TEXT.CLASS_UPDATE}</Typography>
        </Button>
        <Button
          fullWidth={true}
          component={RouterLink}
          to={'/app/student'}
        >
          <Typography>{TEXT.STUDENT}</Typography>
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
        <Stack
          width={'100%'}
          height={'100%'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography>{TEXT.FOOTER}</Typography>
          <Typography>{principal}</Typography>
        </Stack>
      </Box>
    </Box>
  )
}
