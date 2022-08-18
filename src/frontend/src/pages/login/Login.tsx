import { Img } from '@fe/components'
import { Box, Button, Stack, Typography } from '@mui/material'

// @ts-ignore
import laptopPng from './assets/png/laptop.png'
// @ts-ignore
import { ReactComponent as PlugSvg } from './assets/svg/plug.svg'

const TEXT = {
  LOGIN: 'Login',
  WELCOME_BACK: 'Welcome Back',
  CONNECT_TO_PLUG: 'Connect to Plug'
}

export function Login() {
  return (
    <Box
      display={'grid'}
      gridTemplateAreas={`"login decoration decorBackground"`}
      gridTemplateColumns={'40% 20% 40%'}
      width={'100%'}
      height={'100%'}
      bgcolor={'#EBEFFF'}
    >
      <Box gridArea={'login'}>
        <Stack
          width={'100%'}
          height={'100%'}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          spacing={3}
        >
          <Typography>{TEXT.WELCOME_BACK}</Typography>
          <PlugSvg />
          <Button
            sx={{
              background:
                'linear-gradient(94.95deg, #FFE701 -1.41%, #FA51D3 34.12%, #10D9ED 70.19%, #52FF53 101.95%)',
              color: 'white',
              textTransform: 'initial'
            }}
          >
            <Typography variant={'subtitle2'}>
              {TEXT.CONNECT_TO_PLUG}
            </Typography>
          </Button>
        </Stack>
      </Box>
      <Box
        gridArea={'decoration'}
        zIndex={0}
      >
        <Box
          component={Img}
          src={laptopPng}
        />
      </Box>
      <Box gridArea={'decorBackground'}>
        <Box
          bgcolor={'#AFB3FF'}
          width={'100%'}
          height={'100%'}
        />
      </Box>
    </Box>
  )
}
