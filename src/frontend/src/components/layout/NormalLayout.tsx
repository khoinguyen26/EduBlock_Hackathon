import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Outlet } from 'react-router-dom'
import { Header, VerticalNav } from './components'

export function NormalLayout() {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'grid'}
      gridTemplateAreas={`"aside header"
                          "aside main"`}
      gridTemplateRows={'150px auto'}
      gridTemplateColumns={'200px auto'}
      gap={1}
      bgcolor={'#A8A6FE'}
    >
      {/* header (horizontal nav) */}
      <Box
        gridArea={'header'}
        // bgcolor={'#A8A6FE'}
        // overflow={'hidden'}
      >
        <Header />
      </Box>
      {/* aside (vertical nav) */}
      <Box
        gridArea={'aside'}
        bgcolor={grey[100]}
      >
        <VerticalNav />
      </Box>
      {/* main view */}
      <Box
        gridArea={'main'}
        bgcolor={grey[200]}
        padding={1}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
