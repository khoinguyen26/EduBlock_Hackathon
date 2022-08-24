import { BaseInterface } from '@fe/constants'
import { sessionStorage } from '@fe/storages'
import { useAtom } from 'jotai'

interface UseSessionStateProps extends BaseInterface {
  store: keyof typeof sessionStorage
}

export function useSessionState(props: UseSessionStateProps) {
  const { store: storeName } = props
  const [state, setState] = useAtom(sessionStorage[storeName])
  return { state, setState }
}
