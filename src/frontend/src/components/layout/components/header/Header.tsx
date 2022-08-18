import { TEXT } from '@fe/components/layout/text'
import { Stack, Typography } from '@mui/material'

export function Header() {
  return (
    <Stack
      width={'100%'}
      height={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Stack
        direction={'row'}
        // alignSelf={'start'}
      >
        <Typography
          fontSize={64}
          color={'white'}
          fontWeight={600}
        >
          {TEXT.EDU}
        </Typography>
        <Typography
          fontSize={64}
          color={'#6B6AB7'}
          fontWeight={600}
        >
          {TEXT.BLOCK}
        </Typography>
      </Stack>
      <Typography
        // alignSelf={'end'}
        // marginRight={1}
        fontWeight={600}
        color={'white'}
      >
        Blockchain-based School Report
      </Typography>
    </Stack>
  )
}
