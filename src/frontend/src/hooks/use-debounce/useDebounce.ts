import { useEffect, useState } from 'react'

interface UseDebounceProps<T> {
  value: T
  delay?: number
}

export function useDebounce<T>(props: UseDebounceProps<T>) {
  const { value, delay }: UseDebounceProps<T> = {
    ...props,
    delay: typeof props.delay === 'undefined' ? 500 : props.delay
  }

  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(debounce)
    }
  }, [value, delay])

  return { debouncedValue }
}
