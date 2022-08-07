import { backend } from '@be/backend'
import { Button, Input, List, ListItem, Stack } from '@mui/material'
import { useState } from 'react'

export function Home() {
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState<string>('')
  return (
    <Stack>
      <Input
        value={message}
        onChange={({ target: { value } }) => {
          // update message to send
          setMessage(value)
        }}
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
