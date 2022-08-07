import { ConnectButton, ConnectDialog, useConnect } from '@connect2ic/react'
import { Link, Snackbar, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const TEXT = {
  ROOT: 'Root'
}

export function Header() {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false)

  const { principal, status: icConnectionStatus } = useConnect({
    onConnect: () => {
      console.info('connected')
    },
    onDisconnect: () => {
      console.info('disconnected')
    }
  })

  useEffect(() => {
    setNotificationOpen(true)
  }, [icConnectionStatus])

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      height={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Link
        component={RouterLink}
        to={'/'}
      >
        <Typography>{TEXT.ROOT}</Typography>
      </Link>
      <ConnectButton />
      {/* hidden section */}
      <ConnectDialog />
      <Snackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        autoHideDuration={2000}
        message={principal || icConnectionStatus}
      />
    </Stack>
  )
}
