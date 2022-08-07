import { backend } from '@be/backend'
import { Button, List, ListItem, Stack, TextField } from '@mui/material'
import { useState } from 'react'

export function Home() {
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')
  return (
    <Stack>
      <TextField
        value={message}
        onChange={({ target: { value } }) => {
          // update message to send
          setMessage(value)
        }}
        label={'Name'}
      />
      <Button
        onClick={() => {
          backend.greet(message).then((response) => {
            // update message history
            setMessages((prev) => [...prev, response])
          })
        }}
      >
        Send
      </Button>
      <List>
        {messages.map((item, index) => (
          <ListItem key={`${index}__${item.slice(0, 3)}`}>{item}</ListItem>
        ))}
      </List>
    </Stack>
  )
}
