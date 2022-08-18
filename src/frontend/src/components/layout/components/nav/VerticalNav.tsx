import { TEXT } from '@fe/components/layout/text'
import { AutoAwesomeMosaic, Message } from '@mui/icons-material'
import { Avatar, Button, Divider, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
// @ts-ignore
import avatarPng from '@fe/components/layout/assets/png/avatar.png'

const navItems = [
  {
    to: '/app/teacher',
    text: TEXT.TEACHER,
    icon: <AutoAwesomeMosaic />
  },
  {
    to: '/app/student',
    text: TEXT.STUDENT,
    icon: <Message />
  }
]

export function VerticalNav() {
  const location = useLocation()

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
          src={avatarPng}
          sx={{
            width: 80,
            height: 80
          }}
        />
        <Typography>{TEXT.USERNAME}</Typography>
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
              startIcon={icon}
              component={RouterLink}
              to={to}
              sx={{
                backgroundColor: matchedRoute ? '#6B6AB7' : 'transparent',
                color: matchedRoute ? 'white' : 'black',
                ':hover': {
                  backgroundColor: '#6B6AB7',
                  color: 'white'
                }
              }}
            >
              <Typography>{text}</Typography>
            </Button>
          )
        })}
      </Stack>
    </Stack>
  )
}
