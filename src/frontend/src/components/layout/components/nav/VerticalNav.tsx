import { TEXT } from '@fe/components/layout/text'
import { AutoAwesomeMosaic, Message } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
// @ts-ignore
import { usePersistentState } from '@fe/hooks'

const navItems = [
  {
    to: '/app/teacher',
    text: TEXT.TEACHER,
    icon: <AutoAwesomeMosaic />
  },
  {
    to: '/app/class',
    text: TEXT.CLASS,
    icon: <Message />
  }
]

export function VerticalNav() {
  const location = useLocation()
  const { state: account } = usePersistentState({ store: 'account' })

  return (
    <Stack
      width={'100%'}
      height={'100%'}
      spacing={1}
      divider={<Divider />}
    >
      <Stack
        marginTop={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Avatar
          alt={'avt'}
          // src={avatarPng}
          sx={{
            width: 80,
            height: 80
          }}
        >{`${account.firstName[0]}${account.lastName[0]}`}</Avatar>
        <Typography textTransform={'capitalize'}>
          {account.firstName} {account.lastName}
        </Typography>
      </Stack>
      <Stack
        paddingX={1}
        spacing={1}
      >
        {navItems.map(({ to, icon, text }, index) => {
          const currentLinkRoute = to.split('/').at(-1)
          const matchedRoute = location.pathname
            .split('/')
            .at(-1)
            .match(currentLinkRoute)
          return (
            <Button
              key={`${text.split(' ').at(-1)}__${index}`}
              fullWidth={true}
              // startIcon={icon}
              component={RouterLink}
              to={to}
              sx={{
                backgroundColor: matchedRoute ? '#6B6AB7' : 'transparent',
                color: matchedRoute ? 'white' : 'black',
                textTransform: 'initial',
                ':hover': {
                  backgroundColor: '#6B6AB7',
                  color: 'white'
                }
              }}
            >
              <Stack
                width={'100%'}
                direction={'row'}
                alignItems={'center'}
              >
                <Box
                  width={'30%'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  {icon}
                </Box>
                <Box width={'70%'}>
                  <Typography>{text}</Typography>
                </Box>
              </Stack>
            </Button>
          )
        })}
      </Stack>
    </Stack>
  )
}
